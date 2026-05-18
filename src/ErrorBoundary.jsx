import { Component } from "react";

const twoDimensionalSiteUrl = "/react-site/";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React app error:", error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="error-boundary" role="alert">
        <section className="error-boundary__panel" aria-labelledby="error-boundary-title">
          <p className="error-boundary__eyebrow">Something went wrong</p>
          <h1 id="error-boundary-title">The 3D site could not load.</h1>
          <p className="error-boundary__message">
            An unexpected error stopped this version of the site from running.
            You can continue with the 2D version instead.
          </p>
          <a className="btn error-boundary__button" href={twoDimensionalSiteUrl}>
            Go to 2D version
          </a>
        </section>
      </main>
    );
  }
}
