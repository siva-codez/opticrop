import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-surface rounded-2xl border border-border m-4 md:m-8">
          <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="text-warning" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">Oops! Something went wrong</h2>
          <p className="text-muted max-w-md mb-8">
            We've encountered an unexpected issue while loading this page. Our tools might be resting a bit.
          </p>
          <Button 
            onClick={this.handleReload} 
            icon={<RefreshCw size={18} />}
            variant="primary"
          >
            Try Again
          </Button>
          
          {import.meta.env.DEV && this.state.error && (
            <div className="mt-8 p-4 bg-red-50 text-red-900 rounded-lg text-left text-sm overflow-auto max-w-2xl w-full">
              <p className="font-bold mb-2">{this.state.error.toString()}</p>
              <pre className="whitespace-pre-wrap text-xs font-mono">{this.state.error.stack}</pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
