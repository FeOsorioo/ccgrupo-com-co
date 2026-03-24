// @ts-nocheck — React 19 class component typing quirk with this tsconfig
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[CCGrupo] Uncaught error:', error, info.componentStack);
  }

  render(): React.ReactNode {
    const hasError = (this.state as State).hasError;
    const { children, fallback } = this.props as Props;

    if (!hasError) return children;
    if (fallback) return fallback;

    return (
      <div className="min-h-screen bg-navy-deep text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 border-2 border-red-400/40 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="font-mono text-sm font-bold text-red-400">!</span>
          </div>
          <div className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-red-400 mb-3">
            Error inesperado
          </div>
          <p className="text-gray-300 font-light text-sm leading-relaxed mb-8">
            Algo salió mal. Por favor recarga la página o escríbenos a{' '}
            <a href="mailto:info@ccgrupo.com.co" className="text-teal hover:underline">
              info@ccgrupo.com.co
            </a>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3 border border-white/20 text-white hover:border-teal hover:text-teal transition-all duration-300"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }
}
