import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}
          >
            <h1 style={{ margin: '0 0 16px 0', color: '#d32f2f', fontSize: '28px' }}>
              Oops! Something went wrong
            </h1>
            <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '16px' }}>
              We're sorry for the inconvenience. An unexpected error has occurred.
            </p>
            {this.state.error && (
              <details
                style={{
                  marginTop: '20px',
                  textAlign: 'left',
                  backgroundColor: '#f5f5f5',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
                  Error Details
                </summary>
                <pre
                  style={{
                    margin: '10px 0 0 0',
                    overflow: 'auto',
                    color: '#d32f2f',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }}
                >
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre
                    style={{
                      margin: '10px 0 0 0',
                      overflow: 'auto',
                      color: '#666',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      fontSize: '12px'
                    }}
                  >
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}
            <button
              onClick={() => window.location.href = '/'}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1565c0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1976d2'}
            >
              Go to Home Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
