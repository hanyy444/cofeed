import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectAuthToken, selectAuthUser, setLogin } from "redux/slices/auth.slice"
import useAxiosFunction from "hooks/useAxiosFunction"

export default function useLogin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const token = useSelector(selectAuthToken)
    // const user = useSelector(selectAuthUser)
    const { data, loading, error, axiosFetch: submitAxios, controller } = useAxiosFunction()
    // console.log(data)
    // let data = userFromAxios || user    

    useEffect(() => {
        if (data?.status === 'success') { 
            //// SET GLOBAL AUTH
            dispatch(setLogin({ user: data.user, token: data.token }))
            
            //// NAVIGATE HOME
            navigate('/home')
        }
    }, [data])
    
    return { data, loading, error, submitAxios, controller }
}
