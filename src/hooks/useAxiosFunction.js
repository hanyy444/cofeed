import { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useSelector } from 'react-redux'

const useAxiosFunction = () => {
    const handleError = useErrorHandler()
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [controller, setController] = useState(null)

    //// AUTHENTICATION
    const token = useSelector(state => state.auth.token)
    const isAuth = !!token

    const axiosFetch = async (configObj) => {
        const { axiosInstance, method, url, requestConfig } = configObj
        // console.log(isAuth)
        try {

            setLoading(true)

            const ctrl = new AbortController()
            setController(ctrl)

            const axiosConfig = {
                url,
                method: method.toUpperCase(),
                signal: ctrl.signal,
                headers: { "Authorization": isAuth ? `Bearer ${token}` : undefined, },
                ...requestConfig
            }

            const res = await axiosInstance(axiosConfig)
            // axiosInstance[method.toLowerCase()](url, {
            //     ...requestConfig,
            //     data: requestConfig.data,
            //     "Authorization": isAuth ? `Bearer ${token}` : undefined,
            //     signal: ctrl.signal
            // })
            setResponse(res.data)
        } catch (err) {
            handleError(err)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {

        return () => controller && controller.abort()

    }, [controller])

    return [response, loading, error, axiosFetch]
}

export default useAxiosFunction