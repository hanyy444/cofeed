import './account.component.scss'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Subtitle from '../subtitle/subtitle.component';
import User from '../user/user.component';

const Account = ({ open, setOpen, user }) => ( 
    <div className='account' id="account" data-testid="account">
        <div className="account__head" onClick={setOpen}>
            <Subtitle>Account</Subtitle>
            { !open ? <FaChevronDown /> : <FaChevronUp /> }
        </div>
        {/* RENDERED, BUT HIDDEN */}
        <div className={`${open ? 'show' : 'hide'}`}>
            <User {...user}/>
        </div>
    </div>
)

export default Account;

