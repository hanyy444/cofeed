import React from "react";
import { useSelector } from "react-redux";
import {
  selectFriends,
  selectFriendsStatus,
  selectUser,
  userApi,
} from "redux/slices/users.slice";

import User from "components/display/user/user.component";
import FollowButton from "components/button/follow-button/follow-button.component";
import UserDetails from "./user-details/user-details.component";
import useQuery from "hooks/useQuery";

export default function UserSection({ userId, isMe }) {
  const friends = useSelector(selectFriends);
  const friendsStatus = useSelector(selectFriendsStatus);
  const isFriend = !!friends.find(
    ({ _id }) => _id === userId
  );
  const currentUser = useQuery({
    selector: selectUser,
    thunk: {
      action: userApi.getSingle,
      params: { path: userId },
    },
    extraDeps: [isMe, friendsStatus],
  });

  return (
    <>
      <User
        imageWidth="90px"
        imageHeight="90px"
        imageUrl={currentUser?.image?.url}
        {...currentUser}
      />
      {!isMe && (
        <FollowButton userId={userId} isFriend={isFriend} />
      )}
      <UserDetails {...currentUser} />
    </>
  );
}
