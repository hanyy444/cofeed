import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/auth.slice'

import Dropdown from './ui/dropdown/dropdown.component'
import Notifications from './ui/notifications/notifications.component'
import SearchBox from './ui/search-box/search-box.component'

import useMediaQuery from '../../hooks/useMediaQuery'

const ExploreNav = ({ currentUserId, 
    picturePath, 
    showDropDown,
    toggleDropdown, 
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
        // toggleSearchWrapper(true)
    }, [setSearchQuery, toggleSearchWrapper])

    const onSearchClick = useCallback((e) => {
        // console.log('clicked')
        // isTablet && navigate('/explore')
    }, [isTablet, navigate])

    return (
        <div className="explore__nav">
            <SearchBox 
                onClick={onSearchClick}
                searchQuery={searchQuery}
                onBlur={onBlurSearch}
                onChange={onSearchChange}
            />
            <Notifications />
            <Dropdown 
                picturePath={picturePath}
                toggleDropdown={toggleDropdown}
                showDropDown={showDropDown}
                navItems={navItems}
            />
        </div>
    )
}

export default ExploreNav