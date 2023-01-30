import './profile.page.scss'

// REACT HOOKS
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect} from 'react'

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
        
    const [showModal, toggleShowModal] = useToggle(false)
    
    const { data: user, loading, error } = useSelector(state => state.users.user)
    const getUser = useCallback(() => dispatch( 
        userApi.getSingle({ token, path: userId }) 
    ), [token, userId])
    useEffect(()=>{
        getUser()
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
            <UserDetails 
                userId={userId}
                imageHeight="90px"
                imageWidth="90px"
                {...user}
            />
            <Divider/>
            <FormButton onClick={()=>toggleShowModal(true)}>Add New Post</FormButton>
            <Subtitle>Posts</Subtitle>
            <Posts category='user_posts' userId={userId}/>
        </div>
    )
}

export default ProfilePage;

