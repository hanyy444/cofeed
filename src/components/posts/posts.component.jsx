import './posts.component.scss'
import { useMemo, memo } from 'react'

import MemoizedPost from './post/post.component'
import WithStateHandler from 'utils/withStateHandler'
import useQuery from 'hooks/useQuery'
import postApi from 'api/post/post-api'
import { query } from 'firebase/firestore'
import { selectPostsStatus, selectPosts, selectPostsError } from 'redux/slices/posts.slice'
import { useSelector } from 'react-redux'
import Spinner from 'components/display/spinner/spinner.component'

// TODO: REFACTOR
import ErrorMessage from 'pages/login/error-message'

const Posts = ({ category, userId = '' }) => {
    const categoryHttpPath = useMemo(() => {
        if (category === 'all') return ''
        if (category === 'user_posts') return `${userId}/posts`
        if (category === 'saved') return `${userId}/savedPosts`
        if (category === 'liked') return `${userId}/likedPosts`
        return category
    }, [category]) 

    const postsStatus = useSelector(selectPostsStatus)
    const postsError = useSelector(selectPostsError)
    const posts = useQuery({
        selector: selectPosts,
        thunk: { action: postApi.getAll, params: { path: `${categoryHttpPath}` } },
        extraDeps: [categoryHttpPath]
    })
    
    const renderedPosts = posts.map(post => <MemoizedPost key={post?._id} post={post} /> )

    let content; 
    if (postsStatus === 'failure') { content = <ErrorMessage errorMessage={postsError?.message} />}
    else if (postsStatus === 'pending') { content = <Spinner radius='5rem' /> } 
    else { content = renderedPosts }

    return (
        <ul className= "posts" data-testid="posts">
            {content}
        </ul>
    )
}

export default memo(Posts);