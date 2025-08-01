import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-boundary">
      <div className="error-content">
        <h2>🚨 Something went wrong!</h2>
        <p className="error-message">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <div className="error-actions">
          <button 
            onClick={resetErrorBoundary}
            className="retry-btn"
          >
            🔄 Try Again
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="reload-btn"
          >
            🔄 Reload Page
          </button>
        </div>
        <details className="error-details">
          <summary>Technical Details</summary>
          <pre className="error-stack">
            {error?.stack || 'No stack trace available'}
          </pre>
        </details>
      </div>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  const handleError = (error, errorInfo) => {
    // Log error to console for debugging
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    
    // In a real app, you'd send this to an error reporting service
    // like Sentry, LogRocket, etc.
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Clear any error state when retrying
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary; 