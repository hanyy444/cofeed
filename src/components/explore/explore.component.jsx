// SCSS
import './explore.component.scss'

// REACT
import { useCallback } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';

// HOOKS
import useSearchQuery from '../../hooks/useSearchQuery'
import useToggle from '../../hooks/useToggle';

// COMPONENTS
import ExploreNav from './explore-nav.component';
import Suggestions from './ui/suggestions/suggestions.component';
import SearchWrapper from '../search-wrapper/search-wrapper.component';
import { useErrorHandler } from 'react-error-boundary';

import { userApi, clearSearch } from '../../redux/slices/users.slice'

// TODO: only send in users who are not friends with me!
const Explore = ({ users }) => {

    const handleError = useErrorHandler()

    const dispatch = useDispatch()

    const { token, user: { _id: userId, picturePath}} = useSelector(state => state.auth)

    const [showDropDown, toggleDropdown] = useToggle(false)
    const [showSearchWrapper, toggleSearchWrapper] = useToggle(false)

    const { data, count, page, loading, error } = useSelector(state => state.users.search)

    const searchUsers = useCallback((searchQuery) => {
        dispatch(userApi.search({ token, query: `search=${searchQuery}` }))
    }, [token])

    const clearSearchQuery = useCallback(()=>{
        dispatch(clearSearch())
    },[clearSearch])

    const [ searchQuery, setSearchQuery ] = useSearchQuery({ 
        searchCallback: searchUsers,
        clearSearch: clearSearchQuery 
    })

    if (error) handleError(error)

    return users && ( 
        <div className= "explore" id="explore" data-testid="explore">
            <ExploreNav 
                currentUserId={userId}
                picturePath={picturePath}
                showDropDown={showDropDown} 
                toggleDropdown={toggleDropdown}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                toggleSearchWrapper={toggleSearchWrapper}
            />
            { showSearchWrapper ? ( 
                <SearchWrapper
                    data={data}
                    count={count}
                    page={page}
                    loading={loading}
                    error={error}
                /> 
            ) : (
                <>
                    <Suggestions users={users.filter(user => user._id !== userId)} />
                    <hr className="solid" />
                </>
            )}
            {/* <div className="latest-posts">
                <Subtitle>Latest Post Activity </Subtitle>
                <div className="latest-post">
                    <div className="post">
                        <img src="" alt="" className="post-img" />
                    </div>
                    <a className='explore__link'>See All Posts</a>
                </div>
            </div> */}
        </div>
    )
}

export default Explore;

