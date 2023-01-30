import './search-box.component.scss'
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ 
    searchQuery,
    onClick,
    onBlur,
    onChange,
}) => (
    <div className="search-box" data-testid="search-box" onClick={onClick}>
        <FaSearch/>
        <input 
            type="text" 
            value={searchQuery}
            placeholder='Search' 
            className='search-box__input' 
            onBlur={onBlur}
            onChange={onChange}/>
    </div>
)

export default SearchBox;