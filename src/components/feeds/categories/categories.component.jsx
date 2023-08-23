import './categories.component.scss'

const CATEGORIES = {
    ALL: 'all',
    FOLLOWING: 'following',
    POPULAR: 'popular',
    NEWEST: 'newest'
}

const Categories = ({ category, setCategory }) => {
    
    const renderedCategories = Object.values(CATEGORIES).map((categ, idx) => (
        <li 
            key={idx} 
            onClick={() => setCategory(categ)}
            className={`${category === categ ? 'category active' : 'category'}`}
        >
            {categ}
        </li>
    ))

    return  (
        <ul className="categories" data-testid="categories">
            {renderedCategories}
        </ul>
    ) 
}

export default Categories