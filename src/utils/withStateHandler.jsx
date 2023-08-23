import Spinner from "components/display/spinner/spinner.component"
import { useErrorHandler } from "react-error-boundary"
import React from "react"

// Bugged!!
// This component is a new function in react.
// If called insided a component, it re-renders

const WithStateHandler = ({children, data, loading, error, fallback = <></>}) => {
    // if (error?.message === 'Network Error') console.log(error)
    if (error) useErrorHandler()(error)

    if (loading === 'pending') return <Spinner radius="5rem"/>

    // Handle Empty (Array | Object)
    if ((!data || data.length === 0 ) && (loading === 'success')) return fallback

    return children

}

export default React.memo(WithStateHandler)