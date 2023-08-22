import './dropdown.component.scss'
import useToggle from 'hooks/useToggle';

const Dropdown = ({imageUrl, navItems}) => {
    
    const [showDropDown, toggleDropdown] = useToggle(false)

    const renderedNavList = navItems.map(({handler, text}) => (
        <li key={`nav-dropdown-item-${text}`} onClick={handler}>
            {text}
        </li>
    ))

    return (
        <div className="dropdown" data-testid="dropdown">
            <img 
                src={imageUrl} 
                alt="profile image"
                role="button"
                className="dropdown__img" 
                onBlur={() => toggleDropdown(false)} 
                onClick={toggleDropdown} 
            />
                {showDropDown && <ul className="dropdown__list">
                    {renderedNavList}
                </ul>}
        </div>
    );
}

export default Dropdown;