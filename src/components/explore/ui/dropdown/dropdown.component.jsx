import './dropdown.component.scss'
const Dropdown = ({picturePath, 
    toggleDropdown, 
    showDropDown, 
    navItems}) => {
    return (
        <div className="dropdown" data-testid="dropdown">
            <img src={`http://localhost:3000/public/assets/${picturePath}`} 
                alt="" className="dropdown__img" 
                onBlur={() => toggleDropdown(false)} onClick={toggleDropdown} 
            />
                {showDropDown && <ul className="dropdown__list">
                    {navItems.map(({handler, text}) => (<li key={`nav-dropdown-item-${text}`} onClick={handler}>{text}</li>))}
                </ul>}
        </div>
    );
}

export default Dropdown;