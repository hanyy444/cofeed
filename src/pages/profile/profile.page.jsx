import './profile.page.scss'

// REACT HOOKS
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect} from 'react'

// API
import { userApi } from '../../redux/slices/users.slice'

// CUSTOM HOOKS
import usePosts from '../../hooks/usePosts'
import useToggle from '../../hooks/useToggle'

// COMPONENTS
import Subtitle from '../../components/subtitle/subtitle.component'
import Sidebar from '../../components/sidebar/sidebar.component'
import Spinner from '../../components/spinner/spinner.component'
import Divider from '../../components/divider/divider.component'
import Posts from '../../components/posts/posts.component'
import FormButton from '../../components/button/form-button/form-button.component'
import PostModal from '../../components/post-modal/post-modal.component'
import CreatePostModal from '../../components/post-modal/create-post-modal/create-post-modal.component'
import UserDetails from '../../components/user-details/user-details.component'


const ProfilePage = (props) => {
    
    const { id: userId } = useParams()
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    
    const { data: user, loading, error } = useSelector(state => state.users.user)
    const [ posts, count, postsLoading, postsError ] = usePosts({ userId, url: `${userId}/posts` })


    const [showModal, toggleShowModal] = useToggle(false)

    useEffect(()=>{
        dispatch( userApi.getSingle({ token, url: `${userId}` }) )
    }, [])


    if (loading === 'pending') return <Spinner/>
    if (error || !user) return <div>ERROR!</div>
    
    return ( 
        <div className="profile" id="profile" data-testid="profile">
            {showModal && (
                <PostModal>
                    <CreatePostModal showModal={showModal} toggleShowModal={toggleShowModal}/>
                </PostModal>
            )}
            <Sidebar />
            <section className="profile__section">
                <UserDetails 
                    userId={userId}
                    imageHeight="90px"
                    imageWidth="90px"
                    {...user}
                />
                <Divider/>
                {/* <button className="add-new-post__btn" onClick={() => toggleShowModal(true)}>Add New Post</button> */}
                <FormButton onClick={()=>toggleShowModal(true)}>Add New Post</FormButton>
                <Subtitle>Posts</Subtitle>
                <Posts posts={posts} loading={postsLoading} error={postsError} />
            </section>
        </div>
    )
}

export default ProfilePage;

