// SCSS
import './explore.component.scss'

// REDUX
import { useSelector } from 'react-redux';

// HOOKS
import useSearchQuery from '../../hooks/useSearchQuery'
import useToggle from '../../hooks/useToggle';

// COMPONENTS
import ExploreNav from './explore-nav.component';
import Suggestions from './ui/suggestions/suggestions.component';
import SearchWrapper from '../search-wrapper/search-wrapper.component';
import { useErrorHandler } from 'react-error-boundary';

// TODO: only send in users who are not friends with me!
const Explore = ({ users }) => {

    const handleError = useErrorHandler()
    const { _id: userId, picturePath} = useSelector(state => state.auth.user)

    const [showDropDown, toggleDropdown] = useToggle(false)
    const [showSearchWrapper, toggleSearchWrapper] = useToggle(false)
    const [ searchData, count, page, loading, error, searchQuery, setSearchQuery] = useSearchQuery({ dataType: 'users' })


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
                    data={searchData}
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

