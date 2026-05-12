import { useEffect, useRef, CSSProperties } from 'react';
import * as THREE from 'three';

interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  color0?: string;
  color1?: string;
  color2?: string;
}

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6
}: LiquidEtherProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Shader uniforms
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColors: { value: colors.map(c => new THREE.Color(c)) },
      uViscous: { value: isViscous ? viscous : 0 },
      uCursorSize: { value: cursorSize },
      uMouseForce: { value: mouseForce },
      uAutoDemo: { value: autoDemo ? 1.0 : 0.0 },
      uAutoTime: { value: 0 }
    };

    // Simple fluid-like shader
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform vec3 uColors[3];
        uniform float uViscous;
        uniform float uCursorSize;
        uniform float uMouseForce;
        uniform float uAutoDemo;
        
        varying vec2 vUv;

        // Simplex noise function
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = vUv;
          
          // Aspect ratio correction
          float aspect = uResolution.x / uResolution.y;
          vec2 aspectUV = uv;
          aspectUV.x *= aspect;
          
          // Mouse influence
          vec2 mouse = uMouse;
          mouse.x *= aspect;
          float dist = distance(aspectUV, mouse);
          float mouseEffect = smoothstep(uCursorSize * 0.005, 0.0, dist) * uMouseForce * 0.01;
          
          // Auto movement
          float time = uTime * 0.5;
          if (uAutoDemo > 0.5) {
            vec2 autoPos = vec2(
              0.5 + 0.3 * sin(time * 0.5) * aspect,
              0.5 + 0.3 * cos(time * 0.3)
            );
            float autoDist = distance(aspectUV, autoPos);
            mouseEffect += smoothstep(0.4, 0.0, autoDist) * 0.2;
          }

          // Fluid noise
          float n1 = snoise(uv * 3.0 + time * 0.1 + mouseEffect);
          float n2 = snoise(uv * 6.0 - time * 0.2 + n1 * 0.5);
          float n3 = snoise(uv * 12.0 + time * 0.1 + n2 * 0.5);
          
          // Color mixing
          vec3 color = mix(uColors[0], uColors[1], n1 * 0.5 + 0.5);
          color = mix(color, uColors[2], n2 * 0.5 + 0.5 + mouseEffect);
          
          // Vignette
          float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5));
          
          gl_FragColor = vec4(color, vignette * 0.8); // Transparency
        }
      `,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop with offscreen suspension
    let animationId = 0;
    let isVisible = true;
    const animate = () => {
      uniforms.uTime.value += 0.01;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    const startRAF = () => {
      if (!animationId) animationId = requestAnimationFrame(animate);
    };
    const stopRAF = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uMouse.value.set(x, y);
    };

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((e) => e.isIntersecting);
        if (isVisible) startRAF();
        else stopRAF();
      },
      { rootMargin: '200px' }
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) stopRAF();
      else if (isVisible) startRAF();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibility);
      stopRAF();
      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [colors, isViscous, viscous, cursorSize, mouseForce, autoDemo]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ width: '100%', height: '100%', ...style }} 
    />
  );
}
