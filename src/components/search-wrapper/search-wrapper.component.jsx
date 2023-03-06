import React from 'react';
import './search-wrapper.component.scss'
import User from '../display/user/user.component';
import WithStateHandler from 'utils/withStateHandler';
import { useNavigate } from 'react-router-dom';

const SearchWrapper = (WithStateHandler) => ({
    data, 
    count, 
    page, 
    loading, 
    error
}) => {
    const navigate = useNavigate()
    return (
        <div className= "search-wrapper" data-testid="search-wrapper">
            <WithStateHandler 
                data={data} 
                loading={loading} 
                error={error}
                fallback={<p className="search-wrapper__count">{count} results found</p>}
            > 
                <div className="search-wrapper__data">
                    {
                        data?.map(({ _id, ...user }) => (
                                <User key={`search-${_id}`} 
                                    userId={_id} 
                                    imageUrl={user.image.url}
                                    onClick={()=>navigate(`/profile/${_id}`)}
                                    {...user} 
                                />
                            )
                        )
                    }
                </div>
            </WithStateHandler>
        </div>
    )   
}

export default SearchWrapper(WithStateHandler);

