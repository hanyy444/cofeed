import React from 'react';
import './settings.page.scss'
import HeadingTwo from 'components/typography/heading/heading-2/heading-2.component';
import FormButton from 'components/button/form-button/form-button.component';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

const SettingsPage = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return ( 
        <div className="settings" data-testid="settings">
            <HeadingTwo>Settings</HeadingTwo>
            <FormButton type="button" onClick={()=>{
                dispatch(logout())
                navigate('/login')    
            }}>Log out</FormButton>
        </div>
    )
}

export default SettingsPage;

