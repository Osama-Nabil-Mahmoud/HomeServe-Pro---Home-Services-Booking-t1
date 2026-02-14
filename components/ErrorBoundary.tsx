
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // Added constructor to ensure props are correctly bound to the class instance and available on this.props
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
    if (this.state.hasError) {
      return (
        <div className="p-6 border border-red-200 bg-red-50 text-red-800 rounded-xl">
          <h2 className="text-lg font-bold">Something went wrong.</h2>
          <p>Please refresh the page or contact support if the issue persists.</p>
        </div>
      );
    }

    // Correctly accessing children via this.props as defined in the Component generics
    return this.props.children;
  }
}

export default ErrorBoundary;
