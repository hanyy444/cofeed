import "./create-post-modal.component.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthToken } from "redux/slices/auth.slice";

import postApi from "api/post/post-api";

import UploadImageInput from "components/display/form/upload-image-input/upload-image-input.component";
import FormGroup from "components/display/form/form-group/form-group.component";
import Form from "components/display/form/form.component";
import HeadingFour from "components/typography/heading/heading-4/heading-4.component";
import IconButton from "components/post-modal/icon-button/icon-button.component";
import Button from "components/button";

import { FaEye } from "react-icons/fa";

const initialState = {
  description: "",
  image: null,
};

const getTypeInfo = (type) => {
  if (type === "create") {
    return {
      initialState,
      heading: "Create New Post",
      buttonText: "Create",
    };
  }

  if (type === "edit") {
    return {
      initialState,
      heading: "Edit Post",
      buttonText: "Edit",
    };
  }

  return {
    initialState,
    heading:
      "Please provide valid type parameter to the component.",
  };
};

const CreatePostModal = ({
  type,
  post = null,
  setModalType,
  toggleShowModal,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);

  const [currentPost, setCurrentPost] = useState(
    post
      ? {
          ...post,
          image: {
            name: post.image.originalName,
            url: post.image.url,
          },
        }
      : initialState
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!currentPost.image)
      errors.image = "You must upload an image";
    return errors;
  };

  const handleChange = (e) => {
    setCurrentPost((prev) => ({
      ...prev,
      description: e.target.value,
    }));
    setErrors({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrentPost((prev) => {
      return {
        ...prev,
        image: {
          url: URL.createObjectURL(file),
          name: file.name,
          file,
        },
      };
    });
    setErrors({});
  };

  const submitPost = (event) => {
    event.preventDefault();

    const { description, image } = currentPost;

    const errors = validate();
    const hasError = Object.keys(errors).length !== 0;

    if (hasError) {
      setErrors(errors);
      return;
    }

    setErrors({});

    const data = image.file
      ? { image: image.file, description }
      : { description };
    const actionParams = {
      token,
      data,
      path: currentPost?._id,
      headers: {
        "Content-Type": image.file
          ? "multipart/form-data"
          : "application/json",
      },
    };

    const action =
      type === "create"
        ? postApi.post(actionParams)
        : postApi.patch(actionParams);

    dispatch(action);

    toggleShowModal(false);

    // window.location.reload()
  };

  const onClickView = (event) => {
    event.stopPropagation();
    setModalType("view");
  };

  return (
    <div
      className="create-post-modal"
      data-testid="create-post-modal"
      aria-label="create post modal"
    >
      {type === "edit" && (
        <IconButton title="View Post" onClick={onClickView}>
          <FaEye />
        </IconButton>
      )}
      <HeadingFour>{getTypeInfo(type).heading}</HeadingFour>
      <Form onSubmit={submitPost}>
        <FormGroup>
          <textarea
            type="text"
            value={currentPost.description}
            name="description"
            autoComplete="off"
            placeholder="Description"
            rows={5}
            onChange={handleChange}
            className="description__input"
          />
        </FormGroup>
        <UploadImageInput
          image={currentPost.image}
          imageError={errors.image}
          handleChange={handleFileChange}
        />
        <Button type="submit">
          {getTypeInfo(type).buttonText}
        </Button>
      </Form>
    </div>
  );
};

export default CreatePostModal;
