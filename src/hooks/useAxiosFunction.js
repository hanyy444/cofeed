import { useCallback, useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthToken } from 'redux/slices/auth.slice'

const useAxiosFunction = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const controller = useRef(new AbortController())

    //// AUTHENTICATION
    const token = useSelector(selectAuthToken)
    const isAuth = !!token

    const axiosFetch = useCallback(async (configObj) => {
        const { axiosInstance, method, url, headers, requestConfig } = configObj
        try {
            setLoading(true)
            // setController(ctrl)
            const axiosConfig = {
                url,
                method: method.toUpperCase(),
                signal: controller.signal,
                headers: { "Authorization": isAuth ? `Bearer ${token}` : undefined, ...headers },
                ...requestConfig
            }
            const res = await axiosInstance(axiosConfig)
            if (res.statusText !== 'OK') setError(res)
            setData(res.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [token])

    useEffect(() => {
        return () => controller && controller.current.abort()
    }, [controller])

    return { data, loading, error, axiosFetch, controller: controller.current }
}

export default useAxiosFunction