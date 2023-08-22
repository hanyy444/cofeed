import './saved-posts.page.scss'
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser } from 'redux/slices/auth.slice';
import MemoizedPosts from 'components/posts/posts.component';
import HeadingTwo from 'components/typography/heading/heading-2/heading-2.component';
import Button from 'components/button';

const SavedPostsPage = (props) => {
    const user = useSelector(selectAuthUser)
    const [type, setType] = useState('liked') // saved || liked
    const toggleType = useCallback(() => {
        setType(prevType => prevType === 'saved' ? 'liked' : 'saved')
    }, [])
    return ( 
        <div className="saved-posts" data-testid="saved-posts">
            <HeadingTwo>{type.toUpperCase()}</HeadingTwo>
            <Button onClick={toggleType}>{type === 'liked' ? 'Saved' : 'Liked' } POSTS</Button>
            <MemoizedPosts category={type} userId={user?._id} />
        </div>
    )
}

export default SavedPostsPage;

