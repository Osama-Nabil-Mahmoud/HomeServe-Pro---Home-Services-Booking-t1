
"use client";
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Fix: Use React.Component to ensure proper inheritance and type recognition for class components
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // Fix: Property 'state' initialization within the constructor
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // Fix: Accessing 'state' property from the base React.Component class
    if (this.state.hasError) {
      return (
        <div className="p-6 border border-red-200 bg-red-50 text-red-800 rounded-xl m-4">
          <h2 className="text-lg font-bold">عذراً، حدث خطأ ما.</h2>
          <p>يرجى تحديث الصفحة أو المحاولة لاحقاً.</p>
        </div>
      );
    }

    // Fix: Accessing 'props' property from the base React.Component class
    return this.props.children;
  }
}
