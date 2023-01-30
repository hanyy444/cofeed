import React from 'react';
import './sidebar.component.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaHouseUser, FaCommentDots, FaUser, FaBookmark, FaCog } from 'react-icons/fa'

//// COMPONENTS
import Logo from '../Logo/Logo.component';
import Menu from '../menu/menu.component';
import Account from '../account/account.component'

import useToggle from '../../hooks/useToggle';
import useMediaQuery from '../../hooks/useMediaQuery';

const bpPhone = '37.5em'

function Sidebar(props) {

    const navigate = useNavigate()
    const [accountOpen, setAccountOpen] = useToggle(false)
    const [menuOpen, toggleMenuOpen] = useToggle(false)
    const { _id: userId, firstName, picturePath } = useSelector(state => state.auth.user)

    const isPhone = useMediaQuery(`(max-width: ${bpPhone})`)

    console.log(isPhone)

    const menuItems = [
        { icon: <FaHouseUser/>, text: 'Home', link: '/' },
        { icon: <FaCommentDots/>, text: 'Messages', link: '/messages' },
        { icon: <FaUser/>, text: 'Profile', link: `/profile/${userId}` },
        { icon: <FaBookmark/>, text: 'Saved Posts', link: '/saved-posts' },
        { icon: <FaCog/>, text: 'Settings', link: '/settings' },
    ]

    return (
        // <>
        //     {isPhone && <div className='burger-menu' onClick={toggleMenuOpen}/>}
            <section className="sidebar" id="sidebar" data-testid="sidebar" >
                <Logo goHome={() => navigate('/home')}/>
                <Menu userId={userId} menuItems={menuItems} isPhone={isPhone}/>
                <Account 
                    open={accountOpen} 
                    setOpen={() => setAccountOpen(prev => !prev)} 
                    user={{userId, firstName, picturePath }}
                    />
            </section>
        // </>
    )
}

export default Sidebar;

