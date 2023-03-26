import FormButton from 'components/button/form-button/form-button.component';
import MemoizedPosts from 'components/posts/posts.component';
import HeadingTwo from 'components/typography/heading/heading-2/heading-2.component';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from 'redux/slices/auth.slice';
import './saved-posts.page.scss'

const SavedPostsPage = (props) => {
    const { user } = useSelector(selectAuth)
    const [type, setType] = React.useState('liked') // saved || liked
    const toggleType = React.useCallback(() => {
        setType(prevType => prevType === 'saved' ? 'liked' : 'saved')
    },[])
    return ( 
        <div className="saved-posts" data-testid="saved-posts">
            <HeadingTwo>{type.toUpperCase()}</HeadingTwo>
            <FormButton onClick={toggleType}>{type === 'liked' ? 'Saved' : 'Liked' } POSTS</FormButton>
            <MemoizedPosts category={type} userId={user?._id} />
        </div>
    )
}

export default SavedPostsPage;

