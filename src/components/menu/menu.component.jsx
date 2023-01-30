import './menu.component.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useCallback  } from 'react';
import Subtitle from '../subtitle/subtitle.component';
import useMediaQuery from '../../hooks/useMediaQuery';
import MenuItem from '../menu-item/menu-item.component';
import { useEffect } from 'react';

const Menu = ({ menuItems, isPhone }) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    // useRef
    const [active, setActive] = useState(pathname.includes('profile') ? 'Profile' : 'Home') // Home | Messages | Profile | Saved Posts | Settings --> useRef is better

    const navHandler = useCallback(({text, link})=>{
        setActive(text)
        navigate(link)
    },[setActive, navigate])

    useEffect(()=>{
        setActive(pathname.includes('profile') ? 'Profile' : 'Home')
    },[pathname])

    return ( 
        <div className= "menu" id="menu" data-testid="menu">
            {!isPhone && <Subtitle>Menu</Subtitle>}
            <ul className="menu__items">
                {
                    menuItems.map(({ icon, text, link }) => (
                        <MenuItem 
                            key={text}
                            icon={icon}
                            text={text}
                            isActive={active === text}
                            isPhone={isPhone}
                            navHandler={() => navHandler({text, link})}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default Menu;

