import "./post.component.scss";
import { memo, useCallback } from "react";

import { FaHeart, FaCommentDots } from "react-icons/fa";

import usePost from "./usePost";
import useToggle from "hooks/useToggle";

import User from "components/display/user/user.component";
import PostModal from "components/post-modal/post-modal.component";

export default memo(({ post }) => {
  const {
    _id: postId,
    userId: postUserId,
    likes,
    image,
    firstName,
    lastName,
    userImageUrl,
    comments,
  } = post;

  const {
    isLiked,
    handleLike,
    onClickUser,
    isMine,
    isSaved,
    onClickSave,
  } = usePost({ postId, postUserId, likes });

  const [showModal, toggleShowModal] = useToggle(false);
  const openModal = useCallback(
    () => toggleShowModal(true),
    []
  );

  return (
    <>
      {showModal && (
        <PostModal
          post={post}
          showModal={showModal}
          toggleShowModal={toggleShowModal}
          extraModalProps={{
            isLiked,
            handleLike,
            onClickUser,
            isMine,
            isSaved,
            onClickSave,
          }}
        />
      )}
      <div className="post" data-testid="post">
        <img
          src={image?.url}
          alt="post image"
          className="post__img"
          loading="lazy"
          role="button"
          onClick={openModal}
        />
        <div className="post__info">
          <User
            userId={postUserId}
            firstName={firstName}
            lastName={lastName}
            imageUrl={userImageUrl}
            onClick={onClickUser}
          />
          <div className="post__info-stats">
            <div className="post__likes">
              <FaHeart
                className={`${isLiked ? "liked" : ""}`}
                onClick={handleLike}
              />
              <span>{Object.keys(likes || {}).length}</span>
            </div>
            <div
              className="post__comments"
              onClick={openModal}
            >
              <FaCommentDots />
              <span>{comments?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
