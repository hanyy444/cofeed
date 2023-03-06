import './account.component.scss'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Subtitle from '../typography/subtitle/subtitle.component';
import User from '../display/user/user.component';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from 'redux/slices/auth.slice';

const Account = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const { user } = useSelector(selectAuth)
    const onClickUser = useCallback(() => navigate(`/profile/${user._id}`),[user._id])
    return (
        <div className='account' data-testid="account">
            <div className="account__head" onClick={setOpen}>
                <Subtitle>Account</Subtitle>
                { !open ? <FaChevronDown /> : <FaChevronUp /> }
            </div>
            <div className={`${open ? 'show' : 'hide'}`}>
                <User imageUrl={user.image.url} {...user} onClick={onClickUser}/>
            </div>
        </div>
    )
}

export default Account;

