import './posts.component.scss'
import Post from '../post/post.component'
import Spinner from '../spinner/spinner.component'
import usePosts from '../../hooks/usePosts'
import { useMemo } from 'react'

const Posts = ({ category, userId = '' }) => {

    const categoryHttpPath = useMemo(() => {
        if (category === 'user_posts') return `/${userId}/posts`
        return `${category === 'all' ? '' : category}`
    }, [category]) 


    // NOTE: COMPONENT RE-RENDER
    const [ posts, count, loading, error ] = usePosts({ path: `${categoryHttpPath}` })

    if (loading === 'pending') return (
        <div className= "posts" id="posts" data-testid="posts">
            <Spinner/>
        </div>
    )

    if (error) return <div>ERROR {error.status}! {error.message}</div>

    return loading === 'success' && posts && ( 
        <div className= "posts" id="posts" data-testid="posts">
            { posts
                .map(({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    likes,
                    comments,
                    picturePath,
                    userPicturePath
                }) => (
                    <Post 
                        key={_id}
                        postId={_id}
                        userId={userId}
                        firstName={firstName}
                        lastName={lastName}
                        description={description}
                        likes={likes}
                        comments={comments}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                    />
                ))
            }
        </div>
    )
}

export default Posts;

