import './add-comment-form.component.scss'
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from 'redux/slices/auth.slice';
import postApi from 'api/post/post-api';
import FormGroup from 'components/display/form/form-group/form-group.component';
import Form from 'components/display/form/form.component';
import Button from 'components/button';

const AddCommentForm = ({ postId }) => {
    const dispatch = useDispatch()
    const token = useSelector(selectAuthToken)
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (text.trim() === '') return
        dispatch( postApi.addComment({ token, path: `${postId}/comment`, data: { text } }) )
        setText('')
    }
    return ( 
        <form className="add-comment-form" data-testid="add-comment-form" onSubmit={onSubmit}>
            <FormGroup>
                <input 
                    name="text"
                    type="text"
                    value={text}
                    placeholder="Write a comment..."
                    onChange={(e) => setText(e.target.value)}
                />
                <Button type="submit">+</Button>
            </FormGroup>
        </form>
    )
}

export default AddCommentForm;

