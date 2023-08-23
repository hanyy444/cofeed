import React from 'react';
import './sidebar.component.scss'
import { useNavigate } from 'react-router-dom';


//// COMPONENTS
import Logo from 'components/Logo/Logo.component';
import Menu from './menu/menu.component';
import Account from 'components/account/account.component'

import useToggle from 'hooks/useToggle';
import useMediaQuery from 'hooks/useMediaQuery';


function Sidebar(props) {

    const navigate = useNavigate()
    const [accountOpen, setAccountOpen] = useToggle(false)
    const isPhone = useMediaQuery(`(max-width: 43.75em)`)
    return (
        <aside className="sidebar" id="sidebar" data-testid="sidebar" >
            <Logo goHome={() => navigate('/home')}/>
            <Menu isPhone={isPhone}/>
            {!isPhone && <Account 
                open={accountOpen} 
                setOpen={() => setAccountOpen(prev => !prev)} 
            />}
        </aside>
    )
}

export default Sidebar;

