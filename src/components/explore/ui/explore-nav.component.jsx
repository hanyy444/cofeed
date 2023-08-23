import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from 'redux/slices/auth.slice'
import { userApi, clearSearch} from 'redux/slices/users.slice'
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, selectAuthToken } from 'redux/slices/auth.slice';

import Dropdown from './dropdown/dropdown.component'
import SearchBox from './search-box/search-box.component'

import useSearchQuery from 'hooks/useSearchQuery'

const ExploreNav = ({ toggleSearchWrapper }) => {
        
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id: userId, image } = useSelector(selectAuthUser)
    const token = useSelector(selectAuthToken)

    const searchUsers = useCallback(
        (searchQuery) =>  dispatch( userApi.search({ token, query: `search=${searchQuery}` }) ),
        [token]
    )

    const clearSearchQuery = useCallback(() => dispatch(clearSearch()), [])

    const [ searchQuery, setSearchQuery ] = useSearchQuery({ 
        searchCallback: searchUsers,
        clearSearch: clearSearchQuery 
    })

    const navItems = useMemo(() => 
        [
            { text: 'Profile', handler: () => navigate(`/profile/${userId}`)},
            { text: 'Logout', handler: () => {
                dispatch(logout())
                navigate('/login')
            }}
        ], 
        [userId]
    )
 
    // const onBlurSearch = useCallback(() => {
    //     setSearchQuery('')
    //     toggleSearchWrapper(false)
    // }, [setSearchQuery, toggleSearchWrapper])

    const onSearchChange = useCallback((e) => {
        const value = e.target.value
        setSearchQuery(value)
        toggleSearchWrapper(!!(value.trim()))
    }, [setSearchQuery, toggleSearchWrapper])

    return (
        <div className="explore__nav">
            <SearchBox searchQuery={searchQuery} onChange={onSearchChange} />
            <Dropdown  imageUrl={image?.url} navItems={navItems}/>
        </div>
    )
}

export default ExploreNav