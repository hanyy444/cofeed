// SCSS
import './explore.component.scss'

// REACT
import { useCallback, useState } from 'react';

// HOOKS
import useSearchQuery from 'hooks/useSearchQuery'
import useToggle from 'hooks/useToggle';

// COMPONENTS
import ExploreNav from './ui/explore-nav.component';
import Suggestions from './suggestions/suggestions.component';
import SearchWrapper from '../search-wrapper/search-wrapper.component';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'redux/slices/auth.slice';
import { userApi, selectSearch, clearSearch} from 'redux/slices/users.slice'
import useMediaQuery from 'hooks/useMediaQuery';

const Explore = () => {
    const isTablet = useMediaQuery('(max-width: 43.75em)')
    const [showSearchWrapper, toggleSearchWrapper] = useToggle(false)
    
    const dispatch = useDispatch()
    const { token, user: { _id: userId, image }} = useSelector(selectAuth)

    //// SEARCH
    const { data, count, page, loading, error } = useSelector(selectSearch)

    const searchUsers = useCallback((searchQuery) => dispatch(
        userApi.search({ token, query: `search=${searchQuery}` }))
    , [token])

    const clearSearchQuery = useCallback(()=>{
        dispatch(clearSearch())
    },[])

    const [ searchQuery, setSearchQuery ] = useSearchQuery({ 
        searchCallback: searchUsers,
        clearSearch: clearSearchQuery 
    })

    return ( 
        <div className= "explore" data-testid="explore">
            <ExploreNav 
                currentUserId={userId}
                imageUrl={image.url}
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
            ) : ( <Suggestions /> )}
            <hr className="solid" />
        </div>
    )
}

export default Explore;

