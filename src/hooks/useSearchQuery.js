import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import usePosts from './usePosts'
// import useUsers from './useUsers'
import { userApi, clearSearch } from '../redux/slices/users.slice'
import useDebounce from './useDebounce'


const useSearchQuery = ({ dataType }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    const [searchQuery, setSearchQuery] = useState('')

    const { data, count, page, loading, error } = useSelector(state => state.users.search)

    const search = useCallback(() => {
        if (searchQuery === '') return
        dispatch(userApi.search({ token, query: `search=${searchQuery}` }))
    }, [token, searchQuery])

    // NOTE: whenever searchQuery changes, it resets the timeout
    // If nothing changes for a sec, timeout callback is run
    useDebounce(search, 500, [searchQuery])


    useEffect(() => {
        return () => dispatch(clearSearch())
    }, [searchQuery])


    return [
        data,
        count,
        page,
        loading,
        error,
        searchQuery,
        setSearchQuery
    ]

}
export default useSearchQuery