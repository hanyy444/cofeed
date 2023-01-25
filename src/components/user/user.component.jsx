import './user.component.scss'
import Paragraph from '../paragraph/paragraph.component';
import { useNavigate } from 'react-router-dom';

const User = ({ userId, 
    picturePath, 
    firstName, 
    lastName = '',
    imageWidth = '45px',
    imageHeight = '45px',
    navigateProfile }) => {

    const navigate = useNavigate()

    return ( 
        <div className= "user" id="user" data-testid="user" onClick={() => navigate(`/profile/${userId}`)}>
            <img 
                className="user-img" 
                src={`http://localhost:3000/public/assets/${picturePath}`}
                width={imageWidth}
                height={imageHeight}
            />
            <div className="user-info">
                <Paragraph>{`${firstName} ${lastName}`}</Paragraph>
                <p className='nickname'>@nickname</p>
            </div>
        </div>
    )
}

export default User;

