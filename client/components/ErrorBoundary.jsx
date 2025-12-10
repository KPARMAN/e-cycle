import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="max-w-md p-8 rounded-lg border border-border bg-card">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-foreground mb-4">
              We encountered an error. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="text-sm text-muted-foreground mb-4 cursor-pointer">
                <summary className="font-semibold mb-2">Error details</summary>
                <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-40 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.href = '/'}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
