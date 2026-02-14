"use client";
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  // Make children optional to avoid "missing children" errors in some JSX environments
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Fix: Using React.Component explicitly and property initialization to resolve 'state' and 'props' visibility issues.
// This ensures that the TypeScript compiler correctly identifies these inherited members from the base React component.
class ErrorBoundary extends React.Component<Props, State> {
  // Fix: Initialize state as a class property to ensure it is correctly typed and visible on the class instance.
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // Fix: Accessing 'state' which is now explicitly defined as a property of the class.
    if (this.state.hasError) {
      return (
        <div className="p-6 border border-red-200 bg-red-50 text-red-800 rounded-xl">
          <h2 className="text-lg font-bold">Something went wrong.</h2>
          <p>Please refresh the page or contact support if the issue persists.</p>
        </div>
      );
    }

    // Fix: Accessing 'props' which is inherited from React.Component.
    return this.props.children;
  }
}

export default ErrorBoundary;