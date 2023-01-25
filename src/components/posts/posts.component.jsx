import './posts.component.scss'
import Post from '../post/post.component'
import Spinner from '../spinner/spinner.component'

const Posts = ({ posts, loading, error }) => {

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

