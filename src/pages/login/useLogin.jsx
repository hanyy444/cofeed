import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLogin } from "redux/slices/auth.slice"
import { selectAuth } from "redux/slices/auth.slice"
import useAxiosFunction from "hooks/useAxiosFunction"

const useLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(selectAuth)
    const [userFromAxios, loading, error, submitAxios] = useAxiosFunction()
    
    let data = userFromAxios || user    

    React.useEffect(()=>{
        if (
            data?.status === 'success' &&
            data?.token
        ) { 
            const { user, token } = data 
            
            //// SET GLOBAL AUTH
            dispatch(setLogin({ user, token }))
            
            //// NAVIGATE HOME
            navigate('/home')
        }
    }, [data])
    

    return {
        data,
        loading,
        error,
        submitAxios
    }
}

export default useLogin