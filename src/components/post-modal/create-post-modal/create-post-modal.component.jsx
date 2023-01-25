import './create-post-modal.component.scss'

// REACT HOOKS
import { useRef, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// CUSTOM HOOKS
import useClickOutside from '../../../hooks/useClickOutside';
// import { createPost } from '../../../redux/slices/posts.slice';

// COMPONENTS
import FormButton from '../../button/form-button/form-button.component';
import UploadImageInput from '../../form/upload-image-input/upload-image-input.component';
import FormGroup from '../../form/form-group/form-group.component';
import Form from '../../form/form.component';
import HeadingFour from '../../heading/heading-4.component';

// API
import postApi from '../../../api/post/post-api';

const CreatePostModal = ({ showModal, toggleShowModal }) => {
    const dispatch = useDispatch()
    const { token, user } = useSelector(state => state.auth)
    
    const modalRef = useRef()
    const setModalOff = useCallback(() => {
        if(showModal) toggleShowModal(false)
    }, [showModal])
    useClickOutside(modalRef, setModalOff)

    // FIX: extra re-render to achieve click outide functionality (EVENT LISTENER HANDLER BUG)
    const [dummy, setDummy] = useState(false)
    useEffect(()=>{
        setDummy(true)
    },[])

    const [post, setPost] = useState({
        description: '',
        pictureFile: null
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        let errors = {}
        if (!post.pictureFile) errors.pictureFile = 'You must upload an image'
        return errors;
    }

    const handleChange = (e) => {
        setPost(prev => {
            return {
                ...prev,
                description: e.target.value
            }
        })
        setErrors({})
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setPost(prev => {
            return {
                ...prev,
                pictureFile: {
                    url: URL.createObjectURL(file),
                    name: file.name,
                    file
                }
            }
        })
        setErrors({})
    }

    const submitPost = (event) => {
        event.preventDefault()

        const { description, pictureFile } = post

        const errors = validate()
        const hasError = Object.keys(errors).length !== 0

        if (hasError) {
            setErrors(errors)
            return;
        }

        setErrors({})
        dispatch(postApi.post({ 
            token, 
            data: { 
                picturePath: pictureFile.name, 
                description }
            }
        ))
        toggleShowModal(false)
    }

    return dummy && ( 
        <div className= "create-post-modal" id="create-post-modal" data-testid="create-post-modal" ref={modalRef}>
            <HeadingFour>Create New Post</HeadingFour>
            <Form onSubmit={submitPost}>
                <FormGroup>
                    <input 
                        type="text" 
                        value={post.description} 
                        name="description" 
                        placeholder='Description'
                        onChange={handleChange}
                        className='description__input'
                    />
                </FormGroup>
                <UploadImageInput 
                    pictureFile={post.pictureFile}
                    pictureError={errors.pictureFile}
                    handleChange={handleFileChange}
                />
                <FormButton type="submit" classes='create-post-modal__form__btn'>Create</FormButton>
            </Form>
        </div>
    )
}

export default CreatePostModal;

