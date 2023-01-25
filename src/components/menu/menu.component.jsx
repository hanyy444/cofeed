import React, { useCallback } from 'react';
import Subtitle from '../subtitle/subtitle.component';
import { FaHouseUser, FaCommentDots, FaUser, FaBookmark, FaCog } from 'react-icons/fa'
import './menu.component.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const Menu = ({ userId, navItems }) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    // TODO: RETHINK LOGIC - SIDEBAR SHOULDN'T BE RE-RENDERED (SHOULD KEEP ITS STATE)
    // SOLUTION: useRef instead
    const [active, setActive] = useState(pathname.includes('profile') ? 'PROFILE' : 'HOME') // HOME | MESSAGES | PROFILE | SAVED | SETTINGS
    // const active = useRef('HOME')

    // const go = (element, path)=>{
    //     active.current = element
    //     navigate(path)
    // }

    const goHome = useCallback(()=>{
        setActive('HOME')
        // active.current = 'HOME'
        navigate('/')
    }, [])

    const goProfile = useCallback(()=>{
        setActive('PROFILE')

        navigate(`/profile/${userId}`)
    }, [userId])

    // console.log(active.current)
    return ( 
        <div className= "menu" id="menu" data-testid="menu">
            <Subtitle>Menu</Subtitle>
            <ul className='menu__items'>
                <li onClick={goHome} className={active === 'HOME'? 'active' : ''}>
                    <FaHouseUser/>
                    <a>Home</a>
                </li>
                <li onClick={()=>go('MESSAGES', '/messages')} className={active === 'MESSAGES'? 'active' : ''}>
                    <FaCommentDots/>
                    <a>Messages</a>
                </li>
                <li onClick={goProfile} className={active === 'PROFILE'? 'active' : ''}>
                    <FaUser/>
                    <a>Profile</a>
                </li>
                <li onClick={()=>go('SAVED POSTS', '/saved-posts')} className={active === 'SAVED'? 'active' : ''}>
                    <FaBookmark/>
                    <a>Saved Posts</a>
                </li>
                <li onClick={()=>go('SETTINGS', '/settings')} className={active === 'SETTINGS'? 'active' : ''}>
                    <FaCog/>
                    <a>Settings</a>
                </li>
            </ul>
        </div>
    )
}

export default Menu;

