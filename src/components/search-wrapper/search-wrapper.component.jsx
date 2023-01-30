import React from 'react';
import './search-wrapper.component.scss'
import Spinner from '../spinner/spinner.component';
import User from '../user/user.component';

const SearchWrapper = ({
    data, 
    count, 
    page, 
    loading, 
    error
}) => {
    if (data && loading === 'success') return ( 
        <div className= "search-wrapper" data-testid="search-wrapper">
                <>
                    <p className="search-wrapper__count">{count} results found</p> 
                    <ul className="search-wrapper__data">
                        {
                            data?.map(({ _id, 
                                picturePath, 
                                firstName, 
                                lastName }, idx) => (
                                    <li key={`search-${idx}-${_id}`} onClick={()=>console.log('clicked')}>
                                        <User
                                            userId={_id}
                                            picturePath={picturePath}
                                            firstName={firstName}
                                            lastName={lastName}
                                            />
                                    </li>
                                )
                            )
                        }
                    </ul>
                </>
            
        </div>
    )

    return (
        <div className= "search-wrapper" id="search-wrapper" data-testid="search-wrapper">
            <Spinner/>
        </div>
    )
}

export default SearchWrapper;

