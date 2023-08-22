import './explore.component.scss'
import { lazy, useCallback } from 'react';

// HOOKS
import useSearchQuery from 'hooks/useSearchQuery'
import useToggle from 'hooks/useToggle';

// COMPONENTS
import ExploreNav from './ui/explore-nav.component';
import Suggestions from './suggestions/suggestions.component';
import SearchWrapper from '../search-wrapper/search-wrapper.component'
// const SearchWrapper = lazy(() => import('../search-wrapper/search-wrapper.component'))

// REDUX
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, selectAuthToken } from 'redux/slices/auth.slice';
import { userApi, selectSearch, clearSearch} from 'redux/slices/users.slice'

const Explore = () => {
    const [showSearchWrapper, toggleSearchWrapper] = useToggle(false)
    
    const dispatch = useDispatch()
    const { _id: userId, image } = useSelector(selectAuthUser)
    const token = useSelector(selectAuthToken)

    const searchUsers = useCallback(
        (searchQuery) => 
            dispatch( userApi.search({ token, query: `search=${searchQuery}` }) )
        , [token]
    )

    const clearSearchQuery = useCallback(() => {
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
                imageUrl={image?.url}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                toggleSearchWrapper={toggleSearchWrapper}
            />
            { showSearchWrapper ? <SearchWrapper /> : <Suggestions /> }
            <hr className="solid" />
        </div>
    )
}

export default Explore;

