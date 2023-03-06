import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from 'redux/slices/auth.slice'

import Dropdown from './dropdown/dropdown.component'
import Notifications from './notifications/notifications.component'
import SearchBox from './search-box/search-box.component'

import useMediaQuery from 'hooks/useMediaQuery'

const ExploreNav = ({ currentUserId, 
    imageUrl, 
    searchQuery, 
    setSearchQuery,
    toggleSearchWrapper }) => {
        
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isTablet = useMediaQuery('(max-width: 75em)')

    const navItems = useMemo(()=>{
        return [
            { text: 'Profile', handler: () => navigate(`/profile/${currentUserId}`)},
            { text: 'Logout', handler: () => {
                dispatch(logout())
                navigate('/login')
            }}
        ]
    }, [currentUserId, navigate, dispatch, logout])

    const onBlurSearch = useCallback(() => {
        // setSearchQuery('')
        // toggleSearchWrapper(false)
    }, [setSearchQuery, toggleSearchWrapper])

    const onSearchChange = useCallback((e)=>{
        const value = e.target.value.trim()
        setSearchQuery(value)
        toggleSearchWrapper(!(value===''))
    }, [setSearchQuery, toggleSearchWrapper])

    return (
        <div className="explore__nav">
            <SearchBox 
                searchQuery={searchQuery}
                onBlur={onBlurSearch}
                onChange={onSearchChange}
            />
            {/* <Notifications /> */}
            <Dropdown 
                imageUrl={imageUrl}
                navItems={navItems}
            />
        </div>
    )
}

export default ExploreNav