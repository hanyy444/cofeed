import './categories.component.scss'

const CATEGORIES = {
    ALL: 'all',
    FOLLOWING: 'following',
    POPULAR: 'popular',
    NEWEST: 'newest'
}

const Categories = ({ category, setCategory }) => {
    return (
        <ul className="categories" data-testid="categories">
            {
                Object.values(CATEGORIES).map((categ, idx) => (
                    <li 
                        key={idx} 
                        onClick={() => setCategory(categ)}
                        className={`${category === categ ? 'active' : ''}`}
                    >
                        {categ}
                    </li>
                ))
            }
        </ul>
    )
}

export default Categories