import postApi from 'api/post/post-api';
import FormButton from 'components/button/form-button/form-button.component';
import FormGroup from 'components/display/form/form-group/form-group.component';
import Form from 'components/display/form/form.component';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'redux/slices/auth.slice';
import './add-comment-form.component.scss'

const AddCommentForm = ({ postId }) => {
    const dispatch = useDispatch()
    const { token } = useSelector(selectAuth)
    const [text, setText] = React.useState('')
    const changeText = React.useCallback((e)=>{
        setText(e.target.value)
    },[])
    const onSubmit = (e) => {
        e.preventDefault()
        if (text.trim() === '') return
        dispatch(postApi.addComment({ token, path: `${postId}/comment`, data: { text } }))
        setText('')
    }
    return ( 
        <Form classes="add-comment-form" data-testid="add-comment-form" onSubmit={onSubmit}>
            <FormGroup>
                <input 
                    name="text"
                    type="text"
                    value={text}
                    placeholder="Write a comment..."
                    onChange={changeText}
                />
                <FormButton type="submit">+</FormButton>
            </FormGroup>
        </Form>
    )
}

export default AddCommentForm;

