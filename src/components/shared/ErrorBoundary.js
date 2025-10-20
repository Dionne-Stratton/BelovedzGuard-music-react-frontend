import React from "react";

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in the child component tree
 * and display a fallback UI instead of crashing the entire app
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {React.ReactNode} props.fallback - Optional custom fallback UI
 * @returns {JSX.Element} Error boundary component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /**
   * Update state so the next render will show the fallback UI
   * @param {Error} error - The error that was thrown
   * @returns {object} New state with error information
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Log error information for debugging
   * @param {Error} error - The error that was thrown
   * @param {object} errorInfo - Error information from React
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // In production, you might want to log to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  /**
   * Reset error state to allow retry
   */
  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h2>🎵 Oops! Something went wrong</h2>
            <p>
              We're sorry, but something unexpected happened while loading the
              music player.
            </p>
            <div className="error-actions">
              <button onClick={this.handleRetry} className="retry-button">
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="reload-button"
              >
                Reload Page
              </button>
            </div>
            {process.env.NODE_ENV === "development" && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
