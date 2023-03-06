import './menu.component.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect, useMemo  } from 'react';
import Subtitle from 'components/typography/subtitle/subtitle.component';
import MenuItem from './menu-item/menu-item.component';
import { useSelector } from 'react-redux';
import { selectAuth } from 'redux/slices/auth.slice';
import { FaHouseUser, FaCommentDots, FaUser, FaBookmark, FaCog, FaSearch } from 'react-icons/fa'

const Menu = ({ isPhone }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    // CAUSES RE-RENDER
    const { user: { _id: userId } } = useSelector(selectAuth)
    const menuItems = useMemo(()=>[
        { Icon: FaHouseUser, text: 'home', link: '/home' },
        { Icon: FaSearch, text: 'explore', link: '/explore'},
        { Icon: FaCommentDots, text: 'messages', link: '/messages' },
        { Icon: FaUser, text: 'profile', link: `/profile/${userId}` },
        { Icon: FaBookmark, text: 'saved', link: '/saved' },
        { Icon: FaCog, text: 'settings', link: '/settings'},
    ])


    // useRef
    const [active, setActive] = useState(pathname.split('/')[1] || 'home') // Home | Messages | Profile | Saved Posts | Settings --> useRef is better

    const navHandler = useCallback(({text, link})=>{
        if (text === active) {
            let selector;
            if (text === 'home' || text === '') (selector = document.querySelector('.feeds'))
            else if (text === 'profile') (selector = document.querySelector('.profile'))
            else if (text === 'messages') (selector = document.querySelector('.user-chats'))
            else if (text === 'saved') (selector = document.querySelector('.saved-posts'))
            selector && (selector.scrollTop = 0)
        }
        navigate(link)
        setActive(text)
    },[setActive, navigate])

    useEffect(()=>{
        setActive(pathname.split('/')[1] || 'home')
    },[pathname])

    return ( 
        <div className= "menu" data-testid="menu">
            {!isPhone && <Subtitle>Menu</Subtitle>}
            <ul className="menu__items">
                {
                    menuItems.map(({ Icon, text, link }) => (
                        <MenuItem 
                            key={text}
                            Icon={Icon}
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

