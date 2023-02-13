import React from "react"

export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        errorMessage: ""
    }
    static getDerivedStateFromError(error: any) {
        return { hasError: true, errorMessage: error.message }
    }
    componentDidCatch(error: any, errorInfo: any) {
        // logErrorToMyService(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <h1>Error: {this.state.errorMessage}. Contate: @GadelhaTI</h1>
        }
        return this.props.children
    }
}