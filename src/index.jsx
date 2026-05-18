import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './ErrorBoundary'

const root = ReactDOM.createRoot(document.querySelector('#root'))


root.render(
  <ErrorBoundary>
    <App/>
  </ErrorBoundary>
)
