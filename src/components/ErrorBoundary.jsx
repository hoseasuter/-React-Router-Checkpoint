import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error("Something went wrong:", error);
    console.error("Component details:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <h2>Oops! Something went wrong.</h2>
          <p>Please refresh the page and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
