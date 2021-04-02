import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null
        };
    }
  
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { 
            hasError: true,
            error: error
        };
    }
  
    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        // sendErrorToServer(info.componentStack);
    }
  
    render() {

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return React.createElement(
                'div',
                {},
                [
                    this.state.error.toString()
                ]
            );
        }
        return this.props.children; 
    }
}

export default ErrorBoundary