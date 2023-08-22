import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectAuthToken } from "redux/slices/auth.slice"


const WithAuthentication = ({ children }) => {
    
    const navigate = useNavigate()

    const token = useSelector(selectAuthToken)

    const isAuthenticated = !!(token)

    useEffect(() => { 
        if (!isAuthenticated) {
            navigate('/login') 
        }
    }, [isAuthenticated])

    if (!isAuthenticated) return <></>

    if (isAuthenticated) return children

}

export default WithAuthentication