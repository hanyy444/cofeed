import './posts.component.scss'
import React from 'react'

import MemoizedPost from './post/post.component'
import usePosts from 'hooks/usePosts'
import WithStateHandler from 'utils/withStateHandler'


const Posts = ({ category, userId = '', fallback = null }) => {
    const categoryHttpPath = React.useMemo(() => {
        if (category === 'user_posts') return `/${userId}/posts`
        if (category === 'saved') return `/${userId}/savedPosts`
        if (category === 'liked') return `/${userId}/likedPosts`
        return `${category === 'all' ? '' : category}`
    }, [category]) 
    
    const [ posts, _, loading, error ] = usePosts({ path: `${categoryHttpPath}` })

    return <div className= "posts" data-testid="posts">
        <WithStateHandler data={posts} loading={loading} error={error} 
            fallback={fallback}>
            {posts.map(post => <MemoizedPost key={post?._id} post={post}  /> )}
        </WithStateHandler> 
    </div>
}

export default React.memo(Posts);