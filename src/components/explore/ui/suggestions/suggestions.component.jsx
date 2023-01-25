import './suggestions.component.scss'
import FollowButton from '../../../button/follow-button/follow-button.component'
import Subtitle from "../../../subtitle/subtitle.component"
import User from "../../../user/user.component"

const Suggestions = ({ users }) => {
    return (
        <div className="suggestions" data-testid="suggestions">
            <Subtitle>Suggestions For You</Subtitle>
            <a className='explore__link'>See All</a>
            {
                users.slice(1, 4).map(({ _id: friendId, 
                    firstName, 
                    lastName, 
                    picturePath }, idx) => {
                        return (
                            <div className="suggestion" key={`suggestion-${idx}`}>
                                <User 
                                    userId={friendId}
                                    picturePath={picturePath}
                                    firstName={firstName}
                                    lastName={lastName}
                                />
                                <FollowButton friendId={friendId} />
                            </div>
                        )})
            }
        </div>
    )
}

export default Suggestions