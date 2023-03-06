import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from 'redux/slices/auth.slice'

const useAxiosFunction = () => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [controller, setController] = useState(null)

    //// AUTHENTICATION
    const { token } = useSelector(selectAuth)
    const isAuth = !!token

    const axiosFetch = async (configObj) => {
        const { axiosInstance, method, url, headers, requestConfig } = configObj
        try {
            setLoading(true)
            const ctrl = new AbortController()
            setController(ctrl)
            const axiosConfig = {
                url,
                method: method.toUpperCase(),
                signal: ctrl.signal,
                headers: { "Authorization": isAuth ? `Bearer ${token}` : undefined, ...headers },
                ...requestConfig
            }
            const res = await axiosInstance(axiosConfig)
            if (res.statusText !== 'OK') setError(res)
            setResponse(res.data)
        } catch (err) {
            setError(err)
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