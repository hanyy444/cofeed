import { ErrorBoundary } from "react-error-boundary"
import Fallback from "./fallback/fallback.component"
import { useState } from "react"

const WithErrorBoundary = ({ children }) => {

    // TODO: STATE FOR ERROR
    const [errorState, setErrorState] = useState(null)

    // OPTIONS: 1. Use redux directly (for what? .. knowing the error state) 
    // 2. Internal
    // - use which slice? ..
    // 1. check every slice
    const resetBoundary = () => {
        setErrorState(null)
    }
    return (
        <ErrorBoundary
            onError={(error)=>setErrorState(error)}
            FallbackComponent={Fallback}
            onReset={resetBoundary} //This will be called immediately before the ErrorBoundary resets it's internal state
        >
            {!errorState && children}
        </ErrorBoundary>
    )
}

export default WithErrorBoundary