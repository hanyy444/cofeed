import "./messages.page.scss";
import {
  lazy,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthUser,
  selectAuthToken,
} from "redux/slices/auth.slice";
import {
  selectFriends,
  selectFriendsError,
  selectFriendsStatus,
} from "redux/slices/users.slice";
import {
  clearChat,
  selectChat,
} from "redux/slices/user-chats.slice";
import userApi from "api/user/user-api";
import User from "components/display/user/user.component";
import Paragraph from "components/typography/paragraph/paragraph.component";
import UserChatsList from "./user-chats/user-chats.component";
import { FaArrowLeft } from "react-icons/fa";
import useToggle from "hooks/useToggle";
import useMediaQuery from "hooks/useMediaQuery";
import WithStateHandler from "utils/withStateHandler";
import useQuery from "hooks/useQuery";

const MessagesList = lazy(() =>
  import("./messages-list/messages-list.component")
);
const MessagesForm = lazy(() =>
  import("./messages-form/messages-form.component")
);

const MessagesPage = (props) => {
  const navigate = useNavigate();
  const isPhone = useMediaQuery("(max-width: 43.75em)");
  const dispatch = useDispatch();
  const sender = useSelector(selectAuthUser);

  const friends = useQuery({
    selector: selectFriends,
    thunk: {
      action: userApi.getUserFriends,
      params: { path: `${sender?._id}/friends` },
    },
  });
  const friendsStatus = useSelector(selectFriendsStatus);
  const friendsError = useSelector(selectFriendsError);

  const { data: chat } = useSelector(selectChat);
  const [isChat, toggleIsChat] = useToggle(!!chat);
  const [receiver, setReceiever] = useState(
    chat
      ? {
          _id: chat.recieverId,
          chatId: chat.chatId,
          receiverId: chat.receiverId,
          ...friends.find(
            ({ _id }) => _id === chat.recieverId
          ),
        }
      : null
  );

  const handleReturn = useCallback(() => {
    toggleIsChat(false);
    setReceiever(null);
    dispatch(clearChat());
  }, []);

  const onClickUser = useCallback(() => {
    navigate(`/profile/${receiver?._id}`);
  }, [receiver?._id]);

  return (
    <div className="messages" data-testid="messages">
      <WithStateHandler
        data={friends}
        loading={friendsStatus}
        error={friendsError}
        fallback={
          <Paragraph
            style={{
              alignSelf: "center",
              justifySelf: "center",
              gridColumn: "1/-1",
            }}
          >
            Follow some friends and start chatting
          </Paragraph>
        }
      >
        {((isPhone && !isChat) || !isPhone) && (
          <UserChatsList
            sender={sender}
            receiver={receiver}
            setReceiever={setReceiever}
            toggleIsChat={toggleIsChat}
            friends={friends}
          />
        )}
        {isPhone && isChat && (
          <FaArrowLeft onClick={handleReturn} />
        )}
        {isPhone && receiver && isChat && (
          <User
            imageUrl={receiver?.image?.url}
            onClick={onClickUser}
            {...receiver}
          />
        )}
        {receiver && isChat && (
          <MessagesList
            sender={sender}
            receiver={receiver}
          />
        )}
        {isChat && (
          <MessagesForm
            sender={sender}
            receiverId={receiver?._id}
            chatId={receiver?.chatId}
          />
        )}
      </WithStateHandler>
    </div>
  );
};

export default MessagesPage;
