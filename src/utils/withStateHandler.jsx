import Spinner from "components/display/spinner/spinner.component"
import { useErrorHandler } from "react-error-boundary"

const WithStateHandler = ({children, data, loading, error, fallback = <></>}) => {
        
    if (error) useErrorHandler()(error)

    if (loading === 'pending') return <Spinner/>

    // Handle Empty (Array | Object)
    if ((!data || data.length === 0 ) && (loading === 'success')) return fallback

    return children

}

export default WithStateHandler