import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { addPostResponseContext } from "../Context/ContextShare";
import { BASE_URL } from "../baseUrl";

function CreatePost() {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const [uName, setUName] = useState("");
  const { addPostResponse, setAddPostResponse } = useContext(
    addPostResponseContext
  );
  // console.log(userId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add POST
  const [newPost, setNewPost] = useState({
    title: "",
    desc: "",
    community: "",
    file: "",
  });
  const handleSubmit = () => {
    setUserId(sessionStorage.getItem("existingUser"));
    setUName(sessionStorage.getItem("existingUserId"));

    if (
      !newPost.title ||
      !newPost.desc ||
      !newPost.community ||
      !newPost.file
    ) {
      alert("Enter All Feilds");
    } else {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("username", uName);
      formData.append("title", newPost.title);
      formData.append("desc", newPost.desc);
      formData.append("community", newPost.community);
      formData.append("file", newPost.file); // Append the file

      // formData.forEach((value, key) => {
      //   console.log(key + ", " + value);
      // });

      axios
        .post(`${ BASE_URL }/api/posts/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          setAddPostResponse(response);
          setNewPost({ title: "", desc: "", community: "", file: "" });
          alert("Post Created");
          handleClose();
        })
        .catch((error) => console.error("Error creating post:", error));
    }
  };

  return (
    <>
      <div
        className="card m-3 mx-auto   text-center"
        style={{ maxWidth: "35rem" }}
      >
        <div className="card-body ">
          <h5 className="card-title">Whats On Your Mind?</h5>
          <Button variant="primary" onClick={handleShow}>
            Create A Post
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <input
              type="file"
              placeholder="Post Title"
              className=" form-control w-100 p-1 mt-1"
              onChange={(e) => {
                setNewPost({
                  ...newPost,
                  file: e.target.files[0],
                });
              }}
            ></input>
            <input
              placeholder="Post Title"
              className=" form-control w-100 p-1 mt-1"
              onChange={(e) => {
                setNewPost({ ...newPost, title: e.target.value });
              }}
            ></input>
            <textarea
              className="form-control w-100 p-1 mt-1"
              placeholder="Caption"
              id="body"
              rows="3"
              onChange={(e) => {
                setNewPost({ ...newPost, desc: e.target.value });
              }}
            ></textarea>

            <input
              placeholder="Community Name"
              className=" form-control w-100 p-1 mt-1"
              onChange={(e) => {
                setNewPost({ ...newPost, community: e.target.value });
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePost;
