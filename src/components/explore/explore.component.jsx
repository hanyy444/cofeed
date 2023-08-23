import './explore.component.scss'

// HOOKS
import useToggle from 'hooks/useToggle';

// COMPONENTS
import ExploreNav from './ui/explore-nav.component';
import Suggestions from './suggestions/suggestions.component';
import SearchWrapper from '../search-wrapper/search-wrapper.component'

const Explore = () => {
    const [showSearchWrapper, toggleSearchWrapper] = useToggle(false)
    return ( 
        <div className= "explore" data-testid="explore">
            <ExploreNav toggleSearchWrapper={toggleSearchWrapper} />
            { showSearchWrapper ? <SearchWrapper /> : <Suggestions /> }
            <hr className="solid" />
        </div>
    )
}

export default Explore;

