import './suggestions.component.scss'

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectSuggestions, selectSuggestionsStatus, selectSuggestionsError } from 'redux/slices/users.slice'
import { userApi } from 'redux/slices/users.slice'

import FollowButton from 'components/button/follow-button/follow-button.component'
import Subtitle from "components/typography/subtitle/subtitle.component"
import User from "components/display/user/user.component"
import useQuery from 'hooks/useQuery'

import WithStateHandler from 'utils/withStateHandler'
import { useSelector } from 'react-redux'

const Suggestions =  () => {
    const navigate = useNavigate()
    const [limit, setLimit] = useState(3)
    const status = useSelector(selectSuggestionsStatus)
    const error = useSelector(selectSuggestionsError)
    const suggestions = useQuery({
        selector: selectSuggestions,
        thunk: { action: userApi.getSuggestions, params: { path: 'suggestions', query: `limit=${limit}` } },
        extraDeps: [limit]
    })
    const handleSuggestionsLimit = useCallback(() => {
        setLimit(prevLimit => prevLimit === 3 ? 0 : 3)
    }, [])   

    const renderedSuggestions = suggestions.map(
        ({ _id: userId, firstName, lastName, image }, idx) => (
            <div className="suggestion" key={`suggestion-${idx}`}>
                <User 
                    userId={userId}
                    imageUrl={image?.url}
                    firstName={firstName}
                    lastName={lastName}
                    onClick={() => navigate(`/profile/${userId}`)}
                />
                <FollowButton userId={userId} key={`suggestion-${idx}-btn`} />
            </div>
        )
    )

    return (
        <div className="suggestions" data-testid="suggestions">
            <Subtitle>Suggestions For You</Subtitle>
            <button 
                type="button" 
                className='explore__link' 
                onClick={handleSuggestionsLimit}>
                    See { limit === 3 ? 'All':'Less'}
            </button>
            <WithStateHandler data={suggestions} loading={status} error={error}>
                {renderedSuggestions}
            </WithStateHandler>
        </div>
    )
}

export default Suggestions