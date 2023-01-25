import './post-modal.component.scss'

// COMPONENT: VIEW POST / CREATE POST 
const PostModal = (props) => {
    return ( 
        <div className= "post-modal" id="post-modal" data-testid="post-modal">
            <div className="post-modal__content">
                {props.children}
            </div>
        </div>
    )
}

export default PostModal;

