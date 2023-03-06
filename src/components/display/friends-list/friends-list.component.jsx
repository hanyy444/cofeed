import React from 'react';
import './friends-list.component.scss'
import User from '../user/user.component'

const FriendsList = ({ friends, selectedFriend, onSelectFriend = () => {} }) => {
    return ( 
        <ul className="friends-list" data-testid="friends-list">
            {
                friends.map(friend => (
                    <li key={friend._id} 
                        className={selectedFriend._id === friend._id ? 'active' : ''}
                        onClick={() => onSelectFriend(friend)}>
                        <User key={friend._id} {...friend}/>
                    </li>
                ))
            }
        </ul>
    )
}

export default FriendsList;

