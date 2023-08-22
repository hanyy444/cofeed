import './user.component.scss'
import HeadingTwo from 'components/typography/heading/heading-2/heading-2.component';

const User = ({ imageUrl, 
    firstName, 
    lastName = '',
    imageWidth = '45px',
    imageHeight = '45px',
    onClick,
    extraClasses = ''
}) => ( 
    <a className= {`user ${extraClasses}`} data-testid="user" onClick={onClick}>
        <img 
            className="user-img"
            alt="user-image" 
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
        />
        <div className="user-info">
            <HeadingTwo>{`${firstName} ${lastName}`}</HeadingTwo>
        </div>
    </a>
)

export default User;

