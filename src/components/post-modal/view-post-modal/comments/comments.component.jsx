import React from 'react';
import User from 'components/display/user/user.component';
import './comments.component.scss'

const Comments = ({ comments = [], onClickUser }) => {
    return ( 
        <ul className="comments">
            {
                comments.map((comment, idx) => (
                    <li key={`comment-${idx}`} className="comment">
                        <User 
                            imageHeight='30px' 
                            imageWidth='30px' 
                            imageUrl={comment.userImageUrl} 
                            onClick={onClickUser}
                            {...comment}
                        />
                        <span className='comment__text'>{comment.text}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default Comments;

