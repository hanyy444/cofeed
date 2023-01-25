import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUsers, getUser, } from "../redux/slices/users.slice"

//// SEARCHING, FRIENDS
const useUsers = ({ query }) => {

    const dispatch = useDispatch()

    const { token } = useSelector(state => state.auth)

    const { data: users, count, loading, error, page } = useSelector(state => state.users.users)

    const fetchUsers = () => {
        dispatch(getUsers({
            method: 'get',
            url: `/users/${query}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }

        }))
    }

    useEffect(() => {
        fetchUsers()
    }, [query])

    return [users,
        count,
        page,
        loading,
        error]
}

export default useUsers