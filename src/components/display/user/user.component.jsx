import './user.component.scss'
import Paragraph from 'components/typography/paragraph/paragraph.component';
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
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
        />
        <div className="user-info">
            <HeadingTwo>{`${firstName} ${lastName}`}</HeadingTwo>
            {/* <p className='nickname'>@nickname</p> */}
        </div>
    </a>
)

export default User;

