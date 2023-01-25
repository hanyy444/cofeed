import './story.component.scss'

import  React, { useState } from 'react'
import Paragraph from '../../paragraph/paragraph.component'

const Story = ({ userName, userPicture }) => {

    const [seen, setSeen] = React.useState(false)

    return (
        <div 
            className={`story ${seen ? 'seen':''}`} 
            data-testid="story" 
            onClick={() => setSeen(true)}
        >
            <img src={userPicture} alt="story user image" className='story__user-img'/>
            <Paragraph>{userName}</Paragraph>
        </div>
    )
}

export default Story
