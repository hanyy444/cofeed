import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"


const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate()

    const auth = !!(useSelector(state => state.auth.token))

    useEffect(() => { if (!auth) navigate('/login') }, [auth])

    if (auth) return children

}

export default ProtectedRoute