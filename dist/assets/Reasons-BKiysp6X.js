const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SplitText-BZeXa5qL.js","assets/vendor-react-lSmCTsfu.js","assets/vendor-gsap-BuGhR5I2.js"])))=>i.map(i=>d[i]);
import{u as P,_}from"./index-C22Qc7o5.js";import{a as n,j as e}from"./vendor-react-lSmCTsfu.js";import{b as L,c as T,m as w}from"./vendor-motion-Be6nM6jk.js";import{E as A,S as C,i as I,c as D,k as M,Z as z}from"./vendor-lucide-CJz7tcku.js";import"./vendor-react-dom-CDhYrCCu.js";const O=n.lazy(()=>_(()=>import("./SplitText-BZeXa5qL.js"),__vite__mapDeps([0,1,2]))),v=[A,C,I,D,M,z],b=["border-teal/30","border-teal/20","border-teal/25","border-teal/30","border-teal/20","border-teal/25"],W=50/32,$=5,B=`
  :root { --ccg-cw: 240px; }
  @media (min-width: 480px)  { :root { --ccg-cw: 290px; } }
  @media (min-width: 768px)  { :root { --ccg-cw: 335px; } }
  @media (min-width: 1024px) { :root { --ccg-cw: 390px; } }

  /* Each card slot = card width + 16 px left gap.
     With the array doubled, translateX(-50%) is always a seamless restart. */
  .ccg-card {
    flex-shrink: 0;
    width: calc(var(--ccg-cw) + 16px);
    padding-left: 16px;
    padding-top: 12px;
    padding-bottom: 16px;
    box-sizing: border-box;
    position: relative;
  }

  /* JS drives --ccg-offset (percent of track width).
     translate3d goes on its own line so transforms compose correctly. */
  .ccg-track {
    display: flex;
    width: max-content;
    transform: translate3d(var(--ccg-offset, 0%), 0, 0);
    will-change: transform;
    touch-action: pan-y;
  }
  .ccg-track-wrap { cursor: grab; }
  .ccg-track-wrap:active { cursor: grabbing; }

  .ccg-track-wrap:hover .ccg-card {
    filter: brightness(0.65);
    transition: filter 0.2s;
  }
  .ccg-track-wrap:hover .ccg-card:hover {
    filter: brightness(1.05);
    z-index: 10;
  }
`;function V(){const{t:a,lang:g}=P(),x=n.useRef(null),l=n.useRef(null),s=n.useRef(0),d=n.useRef(!1),u=n.useRef(!1),c=n.useRef(null),{scrollYProgress:y}=L({target:x,offset:["start end","end start"]}),k=T(y,[0,1],[60,-60]);n.useEffect(()=>{let t=0,r=performance.now();const o=i=>{const p=(i-r)/1e3;r=i,!d.current&&!u.current&&(s.current-=W*p),s.current<=-50&&(s.current+=50),s.current>0&&(s.current-=50),l.current&&l.current.style.setProperty("--ccg-offset",`${s.current}%`),t=requestAnimationFrame(o)};return t=requestAnimationFrame(o),()=>cancelAnimationFrame(t)},[]),n.useEffect(()=>{const t=o=>{if(!d.current||!c.current)return;const i=o.clientX-c.current.x;Math.abs(i)>$&&(c.current.moved=!0);const{trackWidth:p,offsetPct:R}=c.current,S=p>0?i/p*100:0;s.current=R+S},r=()=>{d.current=!1};return window.addEventListener("pointermove",t),window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),()=>{window.removeEventListener("pointermove",t),window.removeEventListener("pointerup",r),window.removeEventListener("pointercancel",r)}},[]);const j=t=>{if(t.button!==0&&t.pointerType==="mouse")return;const r=l.current?.getBoundingClientRect().width??0;d.current=!0,c.current={x:t.clientX,offsetPct:s.current,trackWidth:r,moved:!1}},m=t=>t.replace(/^(?:Â)?(?:¿)\s*/,"").replace(/\?\s*$/,"").trim(),f=a.reasons.items,E=f.length,h=g==="es"?"¿":"",N=[...f,...f];return e.jsxs("section",{id:"reasons",ref:x,className:"relative py-14 sm:py-16",children:[e.jsx("style",{children:B}),e.jsxs("div",{className:"px-6 md:px-14 lg:px-28 max-w-3xl mb-14",children:[e.jsxs(w.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6",children:[e.jsx("div",{className:"w-8 h-px bg-teal"}),a.reasons.label]}),e.jsx("h2",{className:"font-display text-[clamp(1.6rem,4vw,3.8rem)] leading-tight font-normal",children:e.jsx(n.Suspense,{fallback:e.jsxs("span",{className:"inline-block opacity-0",children:[h,m(a.reasons.headingPre)," ",m(a.reasons.headingEm),"?"]}),children:e.jsxs(O,{className:"inline-block",delay:30,duration:1,splitType:"words",from:{opacity:0,y:20},to:{opacity:1,y:0},children:[h,m(a.reasons.headingPre)," ",e.jsxs("em",{className:"italic text-gradient inline-block align-baseline whitespace-nowrap",children:[m(a.reasons.headingEm),"?"]})]},`reasons-heading-${g}`)})})]}),e.jsx("div",{className:"ccg-track-wrap relative overflow-hidden",style:{maskImage:"linear-gradient(to right, transparent, #000 5% 95%, transparent)",WebkitMaskImage:"linear-gradient(to right, transparent, #000 5% 95%, transparent)"},onPointerDown:j,onMouseEnter:()=>{u.current=!0},onMouseLeave:()=>{u.current=!1},children:e.jsx(w.div,{style:{x:k},children:e.jsx("div",{ref:l,className:"ccg-track",children:N.map((t,r)=>{const o=v[r%v.length];return e.jsx("div",{className:"ccg-card",children:e.jsxs("div",{className:`rounded-2xl border ${b[r%b.length]} bg-navy-deep/90 backdrop-blur-sm p-4 md:p-5 flex flex-col gap-3 hover:border-teal/60 hover:bg-navy-deep transition-colors duration-300 group`,children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"w-8 h-8 md:w-10 md:h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center group-hover:bg-teal/20 group-hover:border-teal/40 transition-all duration-300",children:e.jsx(o,{size:17,className:"text-teal",strokeWidth:1.5})}),e.jsx("span",{className:"font-mono text-[0.55rem] tracking-[0.25em] text-teal/40",children:String(r%E+1).padStart(2,"0")})]}),e.jsx("h3",{className:"font-mono text-xs md:text-sm uppercase tracking-wider text-white leading-snug group-hover:text-teal transition-colors duration-300",children:t.title}),e.jsx("p",{className:"text-white font-light text-xs md:text-sm leading-relaxed",children:t.desc}),e.jsx("div",{className:"h-px w-0 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500"})]})},r)})})})})]})}export{V as default};
