import './stories.component.scss'
import { useSelector } from 'react-redux'
import Story from './story/story.component';

const Stories = ({ users }) => {

    const { user: currentUser } = useSelector(state => state.auth)

    return users && currentUser && ( 
        <div className= "stories" id="stories" data-testid="stories">
            {
                [currentUser, ...users.filter(user=>currentUser._id!==user._id)]
                    .map(({ _id, firstName, picturePath }, idx) => (
                        <Story 
                            key={_id}
                            userName={_id === currentUser._id ? 'You' : firstName} 
                            userPicture={`http://localhost:3000/public/assets/${picturePath}`}
                        />
                    ))}
        </div>
    )
}

export default Stories;

