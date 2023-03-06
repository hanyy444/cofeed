import './post-modal.component.scss'
import { useCallback, useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {clearPost} from 'redux/slices/posts.slice'
import Overlay from '../display/overlay/overlay.component'
import useClickOutside from 'hooks/useClickOutside'
import ViewPostModal from './view-post-modal/view-post-modal.component'
import CreatePostModal from './create-post-modal/create-post-modal.component'

// COMPONENT: VIEW POST / CREATE POST
const PostModal = ({ type = "view", post = null, showModal, toggleShowModal }) => {
    const dispatch = useDispatch()
    
    const modalRef = useRef()
    const setModalOff = useCallback(() => {
        if(showModal) toggleShowModal(false)
    }, [showModal])
    useClickOutside(modalRef, setModalOff)

    const [modalType, setModalType] = useState(type)

    // FIX: extra re-render to achieve click outide functionality (EVENT LISTENER HANDLER BUG)
    const [dummy, setDummy] = useState(false)
    useEffect(()=>{
        setDummy(true)
        return () => dispatch(clearPost())
    },[])

    const modalProps = {
        setModalType,
        toggleShowModal, 
        showModal  
    }

    return dummy && ( 
        <>
            <div className= "post-modal" data-testid="post-modal"  aria-expanded={showModal} ref={modalRef}>
                {        
                    modalType === "view"
                    ? ( <ViewPostModal post={post} {...modalProps} /> ) 
                    : ( <CreatePostModal type={modalType} post={post} {...modalProps} /> )
                }
            </div>
            <Overlay/>
        </>
    )
}

export default PostModal;

