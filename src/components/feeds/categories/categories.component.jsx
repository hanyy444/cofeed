import useMediaQuery from '../../../hooks/useMediaQuery'
import './categories.component.scss'

const CATEGORIES = {
    ALL: 'all',
    FOLLOWING: 'following',
    POPULAR: 'popular',
    NEWEST: 'newest'
}

const Categories = ({ category, setCategory }) => {

    // useMediaQuery => button
    // useToggle => ul

    // const isTablet = useMediaQuery('(max-width: 75em)')

    const handleClick = (category) => {
        setCategory(category)
    }

    return  (
        <ul className="categories" data-testid="categories">
            {
                Object.values(CATEGORIES).map((categ, idx) => (
                    <li 
                        key={idx} 
                        onClick={() => handleClick(categ)}
                        className={`${category === categ ? 'category active' : 'category'}`}
                    >
                        {categ}
                    </li>
                ))
            }
        </ul>
    ) 
}

export default Categories