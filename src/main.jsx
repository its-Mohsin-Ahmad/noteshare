import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('NOTEshare Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F7F3] text-[#14213D] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E8E6DF] shadow-xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FFF0D6] border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-[#14213D]">Something went wrong</h2>
            <p className="text-xs text-slate-500">
              The application encountered a temporary display issue. Click below to refresh.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full py-2.5 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Reset & Reload Platform
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
