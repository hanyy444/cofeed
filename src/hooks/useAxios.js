import { useEffect, useState, useReducer } from 'react'
import { useSelector } from 'react-redux'

const useAxios = ({ axiosInstance, method, url, requestConfig = {} }) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    //// AUTHENTICATION
    const token = useSelector(state => state.auth.token)
    const isAuth = !!token


    //// 
    useEffect(() => {
        const abortController = new AbortController()

        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: abortController.signal
                })
                setResponse(res.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => abortController.abort()

    }, [])

    return [response, error, loading]
}

export default useAxios