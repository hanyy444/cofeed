import React from 'react';
import './sidebar.component.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//// COMPONENTS
import Logo from '../Logo/Logo.component';
import Menu from '../menu/menu.component';
import Account from '../account/account.component'

import useToggle from '../../hooks/useToggle';


function Sidebar(props) {

    const navigate = useNavigate()
    const [accountOpen, setAccountOpen] = useToggle(false)
    const { _id: userId, firstName, picturePath } = useSelector(state => state.auth.user)

    return (
        <section className="sidebar" id="sidebar" data-testid="sidebar" >
            <Logo goHome={() => navigate('/home')}/>
            <Menu userId={userId}/>
            <Account 
                open={accountOpen} 
                setOpen={() => setAccountOpen(prev => !prev)} 
                user={{userId, firstName, picturePath }}
            />
        </section>
    );
}

export default Sidebar;

