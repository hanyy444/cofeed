import './menu.component.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, useMemo  } from 'react';
import Subtitle from 'components/typography/subtitle/subtitle.component';
import MenuItem from './menu-item/menu-item.component';
import { shallowEqual, useSelector } from 'react-redux';
import { selectAuth } from 'redux/slices/auth.slice';
import { FaHouseUser, FaCommentDots, FaUser, FaBookmark, FaCog, FaSearch } from 'react-icons/fa'

const Menu = ({ isPhone }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const { user: { _id: authUserId } } = useSelector(selectAuth, shallowEqual)

    const menuItems = useMemo(()=>[
        { Icon: FaHouseUser, text: 'home', link: '/home' },
        { Icon: FaSearch, text: 'explore', link: '/explore'},
        { Icon: FaCommentDots, text: 'messages', link: '/messages' },
        { Icon: FaUser, text: 'profile', link: `/profile/${authUserId}` },
        { Icon: FaBookmark, text: 'saved', link: '/saved' },
        { Icon: FaCog, text: 'settings', link: '/settings'},
    ])


    // useRef
    const [_, activeLink, userId] = pathname.split('/')
    const isMe = userId===authUserId
    const [active, setActive] = useState(activeLink || 'home') // Home | Messages | Profile | Saved Posts | Settings --> useRef is better

    const navHandler = useCallback(({text, link})=>{
        if (text === active) {
            let selector;
            if (text === 'home' || text === '') (selector = document.querySelector('.posts'))
            else if (text === 'saved') (selector = document.querySelector('.posts'))
            else if (text === 'profile'){
                document.querySelector('.profile').scrollTop = 0
                !isMe && navigate(`/profile/${authUserId}`)
                return
            }
            else if (text === 'messages') (selector = document.querySelector('.user-chats'))
            selector && (selector.scrollTop = 0)
        }
        navigate(link)
        setActive(text)
    }, [setActive, navigate])

    useEffect(()=>{
        setActive(activeLink || 'home')
    },[pathname])

    const isActive = (text) => {
        if (text !== 'profile') return active === text
        return isMe
    }

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
                            isActive={isActive(text)}
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

