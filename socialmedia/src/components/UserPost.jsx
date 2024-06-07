import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Card, Collapse, Dropdown, Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { addPostResponseContext } from "../Context/ContextShare";
import { BASE_URL } from "../baseUrl";

function UserPost({ post }) {
  const { addPostResponse, setAddPostResponse } = useContext(
    addPostResponseContext
  );
  const [comments, setComments] = useState(post.comments);
  console.log("commentstate", comments);
  const [open, setOpen] = useState(false);
  const [uId, setUId] = useState(sessionStorage.getItem("existingUser"));
  const [uName, setUName] = useState(sessionStorage.getItem("existingUserId"));
  const [baseUrl, setBaseUrl] = useState("http://localhost:4000/");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [editPost, setEditPost] = useState({
    title: "",
    desc: "",
    file: "",
  });

  // like post
  const likePost = async (postId, userId) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/posts/${postId}/like`, {
        userId,
      });
      setAddPostResponse(response.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // delete post
  const deletePost = async (postId, userId) => {
    console.log("Deleting post");
    try {
      const response = await axios.delete(`${BASE_URL}/api/posts/${postId}`, {
        data: { userId },
      });
      if (response.status === 200) {
        alert("The post has been deleted");
      } else if (response.status === 403) {
        alert("You Can Delete only Your Own Post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Edit post
  const handleEdit = (postId) => {
    setUId(sessionStorage.getItem("existingUser"));
    setUName(sessionStorage.getItem("existingUserId"));

    if (!editPost.title || !editPost.desc || !editPost.file) {
      alert("Enter All Fields");
    } else {
      const formData = new FormData();
      formData.append("userId", uId);
      formData.append("username", uName);
      formData.append("title", editPost.title);
      formData.append("desc", editPost.desc);
      formData.append("file", editPost.file); // Append the file

      formData.forEach((value, key) => {
        console.log(key + ", " + value);
      });

      axios
        .put(`${BASE_URL}/api/posts/${postId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          setEditPost({ title: "", desc: "", community: "", file: "" });
          alert("Post Edited");
          handleClose();
        })
        .catch((error) => console.error("Error Editing post:", error));
    }
  };

  // comment
  const [comment, setComment] = useState("");
  const handleComment = async (postId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/posts/${postId}/comment`,
        {
          userId: uId, // Replace with the actual user ID
          username: uName, // Replace with the actual username
          comment: comment,
        }
      );

      alert("Comment added successfully");
      setAddPostResponse(response.data);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again later.");
    }
  };

  return (
    <>
      <div className="container">
        <section className="mx-auto my-3" style={{ maxWidth: "35rem" }}>
          <Card>
            <div
              className="bg-image hover-overlay ripple"
              data-mdb-ripple-color="light"
            >
              <Card.Img
                src={post ? `${BASE_URL}/${post?.file}` : "No Image"}
                alt="Restaurant Image"
              />
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </div>
            <Card.Body>
              <Card.Title className="font-weight-bold">
                <h4>{post?.title}</h4>
              </Card.Title>

              <p className="mb-2">
                @
                <Link to={`/userprofile/${post?.userId}`}>
                  {post?.username}
                </Link>
              </p>
              <p className="card-text">{post?.desc}</p>
              <div className="d-flex">
                <button
                  className="btn btn-danger d-flex"
                  onClick={() => likePost(post._id, uId)}
                >
                  <i class="far fa-heart">
                    <span>{post?.likes.length}</span>
                  </i>
                </button>
                <button
                  className="btn btn-success w-100 ms-1"
                  onClick={() => setOpen(!open)}
                >
                  View Comments
                </button>
                <Dropdown className="ms-1">
                  <Dropdown.Toggle
                    variant="dark"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShow}>
                      {" "}
                      Edit Post
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => deletePost(post._id, uId)}>
                      Delete Post
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <Collapse in={open}>
                <div className="row">
                  <InputGroup className="mb-3 mt-3">
                    <Form.Control
                      className="bg-white text-dark"
                      placeholder="Add Your Comment"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      style={{ border: "1px solid silver" }}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                      variant="dark"
                      id="button-addon2"
                      className="text-white"
                      onClick={() => handleComment(post._id)}
                    >
                      Add
                    </Button>
                  </InputGroup>

                  <h3>COMMENTS</h3>
                  <ul style={{ listStyle: "none" }}>
                    {comments.map((comment, index) => (
                      <li key={index}>
                        <span className="me-2">
                          <b>@{comment.username}</b>
                        </span>
                        <span>{comment.comment}</span>
                      </li>
                    ))}
                  </ul>
                  {}
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        </section>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setEditPost({ ...editPost, title: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setEditPost({ ...editPost, desc: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="file"
              placeholder="Post Img"
              onChange={(e) => {
                setEditPost({ ...editPost, file: e.target.files[0] });
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEdit(post._id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserPost;
