import React from 'react';
import './search-wrapper.component.scss'
import User from '../display/user/user.component';
import WithStateHandler from 'utils/withStateHandler';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSearch, selectSearchCount, selectSearchError, selectSearchPage, selectSearchStatus } from 'redux/slices/users.slice';

const SearchWrapper = (WithStateHandler) => () => {
    const navigate = useNavigate()

    const data = useSelector(selectSearch)
    const status = useSelector(selectSearchStatus)
    const error = useSelector(selectSearchError)
    const count = useSelector(selectSearchCount)
    const page = useSelector(selectSearchPage)

    const renderedSearchResults = data?.map(({ _id, ...user }) => (
            <User key={`search-${_id}`} 
                userId={_id} 
                imageUrl={user?.image?.url}
                onClick={() => navigate(`/profile/${_id}`)}
                {...user} 
            />
        )
    )
    return (
        <div className= "search-wrapper" data-testid="search-wrapper">
            <WithStateHandler 
                data={data} 
                loading={status} 
                error={error}
                fallback={<p className="search-wrapper__count">{count} results found</p>}
            > 
                <div className="search-wrapper__data">
                    {renderedSearchResults}
                </div>
            </WithStateHandler>
        </div>
    )   
}

export default SearchWrapper(WithStateHandler);

