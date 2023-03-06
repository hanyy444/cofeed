import './suggestions.component.scss'
import FollowButton from 'components/button/follow-button/follow-button.component'
import Subtitle from "components/typography/subtitle/subtitle.component"
import User from "components/display/user/user.component"
import WithStateHandler from 'utils/withStateHandler'
import { useNavigate } from 'react-router-dom'
import { useState, useCallback } from 'react'
import useData from 'hooks/useData'
import { selectSuggestions } from 'redux/slices/users.slice'
import { userApi } from 'redux/slices/users.slice'
const Suggestions =  () => {

    const navigate = useNavigate()
    const [limit, setLimit] = useState(3)
    const {data: suggestions, loading, error} = useData({
        selector: selectSuggestions,
        thunk: { 
            action: userApi.getSuggestions, 
            params: { path: 'suggestions', query: `limit=${limit}` } 
        },
        extraDeps: [limit]
    })
    const handleSuggestionsLimit = useCallback(() => {
        setLimit(prevLimit => prevLimit === 3 ? 0 : 3)
    },[])   

    return (
        <div className="suggestions" data-testid="suggestions">
            <WithStateHandler data={suggestions} loading={loading} error={error}>
                <Subtitle>Suggestions For You</Subtitle>
                <button 
                    type="button" 
                    className='explore__link' 
                    onClick={handleSuggestionsLimit}>
                        See { limit === 3 ? 'All':'Less'}
                </button>
                {
                    suggestions.map(({ _id: userId, 
                        firstName, 
                        lastName, 
                        image }, idx) => {
                            return (
                                <div className="suggestion" key={`suggestion-${idx}`}>
                                    <User 
                                        userId={userId}
                                        imageUrl={image.url}
                                        firstName={firstName}
                                        lastName={lastName}
                                        onClick={()=>navigate(`/profile/${userId}`)}
                                    />
                                    <FollowButton userId={userId} />
                                </div>
                            )})
                }
            </WithStateHandler>
        </div>
    )
}

export default Suggestions