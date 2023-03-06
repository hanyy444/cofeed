import './story.component.scss'

import  React from 'react'
import Paragraph from 'components/typography/paragraph/paragraph.component'

const Story = ({ userName, userImageUrl }) => {

    const [seen, setSeen] = React.useState(false)

    return (
        <div 
            className={`story ${seen ? 'seen':''}`} 
            data-testid="story" 
            onClick={() => setSeen(true)}
        >
            <img src={userImageUrl} alt="story user image" className='story__user-img'/>
            <Paragraph>{userName}</Paragraph>
        </div>
    )
}

export default Story
