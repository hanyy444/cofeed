import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const WithAuthentication = ({ children }) => {

    const navigate = useNavigate()

    const isAuthenticated = !!(useSelector(state => state.auth.token))

    useEffect(() => { if (!isAuthenticated) navigate('/login') }, [isAuthenticated])

    if (!isAuthenticated) return <></>

    if (isAuthenticated) return children

}

export default WithAuthentication