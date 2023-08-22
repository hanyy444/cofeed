import './account.component.scss'
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { selectAuthUser } from 'redux/slices/auth.slice';
import Subtitle from '../typography/subtitle/subtitle.component';
import User from '../display/user/user.component';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Account = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const user = useSelector(selectAuthUser, shallowEqual)
    const onClickUser = useCallback(() => navigate(`/profile/${user?._id}`), [user?._id])
    return (
        <div className='account' data-testid="account">
            <div className="account__head" onClick={setOpen}>
                <Subtitle>Account</Subtitle>
                { !open ? <FaChevronDown /> : <FaChevronUp /> }
            </div>
            <div className={`${open ? 'show' : 'hide'}`}>
                <User imageUrl={user?.image?.url} {...user} onClick={onClickUser}/>
            </div>
        </div>
    )
}

export default Account;

