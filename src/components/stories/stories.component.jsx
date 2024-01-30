import "./stories.component.scss";
import { useSelector } from "react-redux";
import {
  selectAuthUser,
  userApi,
} from "redux/slices/auth.slice";
import { selectFriends } from "redux/slices/users.slice";
import Story from "./story/story.component";
import useQuery from "hooks/useQuery";

const Stories = () => {
  const user = useSelector(selectAuthUser);

  const friends = useQuery({
    selector: selectFriends,
    thunk: {
      action: userApi.getUserFriends,
      params: { path: `${user?._id}/friends` },
    },
  });

  const renderedStories = [user, ...friends].map(
    ({ _id, firstName, image }) => (
      <Story
        key={_id}
        userName={_id === user?._id ? "You" : firstName}
        userImageUrl={image?.url}
      />
    )
  );

  return (
    <div className="stories" data-testid="stories">
      {renderedStories}
    </div>
  );
};

export default Stories;
