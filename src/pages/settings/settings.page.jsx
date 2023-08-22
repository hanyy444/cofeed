import './settings.page.scss'
import { useDispatch } from 'react-redux';
import { logout } from 'redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import HeadingTwo from 'components/typography/heading/heading-2/heading-2.component';
import Button from 'components/button';

const SettingsPage = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return ( 
        <div className="settings" data-testid="settings">
            <HeadingTwo>Settings</HeadingTwo>
            <Button 
                type="button" 
                onClick={() => {
                    dispatch(logout());
                    navigate('/login'); 
                }}
            >
                Log out
            </Button>
        </div>
    )
}

export default SettingsPage;

