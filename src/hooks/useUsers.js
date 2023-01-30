import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { userApi } from '../redux/slices/users.slice'

//// SEARCHING, FRIENDS
const useUsers = ({ query }) => {

    const dispatch = useDispatch()

    const { token } = useSelector(state => state.auth)

    const { data: users, count, loading, error, page } = useSelector(state => state.users.users)

    const getUsers = () => {
        dispatch(userApi.getAll({ token, query }))
    }

    useEffect(() => {
        getUsers()
    }, [query])

    return [users,
        count,
        page,
        loading,
        error]
}

export default useUsers