"use client";
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  // Make children optional to avoid "missing children" errors in some JSX environments
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Inheriting directly from Component and using a constructor often resolves generic type inference issues in class components
class ErrorBoundary extends Component<Props, State> {
  // Use constructor for state initialization to ensure proper inheritance context and property binding
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // Check if the component has caught an error
    if (this.state.hasError) {
      return (
        <div className="p-6 border border-red-200 bg-red-50 text-red-800 rounded-xl">
          <h2 className="text-lg font-bold">Something went wrong.</h2>
          <p>Please refresh the page or contact support if the issue persists.</p>
        </div>
      );
    }

    // Return children as defined in the Component generics
    return this.props.children;
  }
}

export default ErrorBoundary;
