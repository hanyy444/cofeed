import { ErrorBoundary } from "react-error-boundary"
import Fallback from "./fallback/fallback.component"
import { useState } from "react"
import { clearError } from "redux/store"
import { useDispatch } from "react-redux"

const WithErrorBoundary = ({ children }) => {
    const [errorState, setErrorState] = useState(null)
    const dispatch = useDispatch()
    
    const resetBoundary = () => {
        setErrorState(null)
        dispatch(clearError())
        window.location.reload()
    }

    return (
        <ErrorBoundary
            onError={(error)=>setErrorState(error)}
            FallbackComponent={Fallback}
            onReset={resetBoundary}
        >
            {!errorState && children}
        </ErrorBoundary>
    )
}

export default WithErrorBoundary