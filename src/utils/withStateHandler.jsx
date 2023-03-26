import Spinner from "components/display/spinner/spinner.component"
import { useErrorHandler } from "react-error-boundary"
import React from "react"

const WithStateHandler = ({children, data, loading, error, fallback = <></>}) => {
    // if (error?.message === 'Network Error') console.log(error)
    if (error) useErrorHandler()(error)

    if (loading === 'pending') return <Spinner/>

    // Handle Empty (Array | Object)
    if ((!data || data.length === 0 ) && (loading === 'success')) return fallback

    return children

}

export default React.memo(WithStateHandler)