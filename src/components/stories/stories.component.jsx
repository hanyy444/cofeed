import './stories.component.scss'
import { useSelector } from 'react-redux'
import { selectAuth, userApi } from 'redux/slices/auth.slice';
import { selectFriends } from 'redux/slices/users.slice';

import Story from './story/story.component';

import useData from 'hooks/useData';

import WithStateHandler from 'utils/withStateHandler';

const Stories = () => {

    const { user } = useSelector(selectAuth)

    const { data: friends, loading, error } = useData({
        selector: selectFriends,
        thunk: { 
            action: userApi.getUserFriends, 
            params: {
                path: `${user._id}/friends`
            } 
        }
    })

    return <div className= "stories" data-testid="stories">
            {/* <WithStateHandler data={friends} loading={loading} error={error}> */}
                {
                    [user, ...friends]
                        .map(({ _id, firstName, image }) => (
                            <Story 
                                key={_id}
                                userName={_id === user._id ? 'You' : firstName} 
                                userImageUrl={image.url}
                            />
                        ))
                }
            {/* </WithStateHandler>  */}
        </div>
}

export default Stories;

