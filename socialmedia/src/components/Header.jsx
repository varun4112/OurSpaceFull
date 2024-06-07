import { React, useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import logo from "../assets/ourspace.png";
import axios from "axios";
import { IsLoginContext } from "../Context/IsLogin";
import { useContext } from "react";
import { editProfileResponseContext } from "../Context/ContextShare";
import { BASE_URL } from "../baseUrl";

function Header() {
  // Context
  const { setIsLogin } = useContext(IsLoginContext);
  const { setEditProfileResponse } = useContext(editProfileResponseContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [uId, setUId] = useState(sessionStorage.getItem("existingUser"));

  const [newData, setNewData] = useState({
    username: "",
    password: "",
    desc: "",
    city: "",
    from: "",
    profilePicture: "",
  });

  // getting the userId
  const [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId(sessionStorage.getItem("existingUser"));
  }, []);

  // Delete account
  const handleDelete = () => {
    accDelete(userId);
    sessionStorage.clear();
    setIsLogin(false);
    navigate("/");
  };

  const accDelete = async (userId) => {
    // console.log("deleting account");
    try {
      const response = await axios.delete(
        `${{ BASE_URL }}/api/users/${userId}`
      );
      if (response.status === 200) {
        alert("Account has been deleted");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  // Logout
  const handleLogOut = () => {
    alert("logging Out");
    sessionStorage.clear();
    setIsLogin(false);
    navigate("/");
  };

  // edit Profile
  const handleEdit = (uId) => {
    setUserId(sessionStorage.getItem("existingUser"));
    if (
      !newData.username ||
      !newData.password ||
      !newData.desc ||
      !newData.city ||
      !newData.from ||
      !newData.profilePicture
    ) {
      alert("Enter All Feilds");
    } else {
      const formData = new FormData();
      formData.append("userId", uId);
      formData.append("username", newData.username);
      formData.append("desc", newData.desc);
      formData.append("city", newData.city);
      formData.append("from", newData.from);
      formData.append("profilePicture", newData.profilePicture); // Append the file
      axios
        .put(`${BASE_URL}/api/users/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("edit reaspond", response);
          setEditProfileResponse(response);
          setNewData({
            username: "",
            password: "",
            desc: "",
            city: "",
            from: "",
            profilePicture: "",
          });
          alert("Profile Edited");
          handleClose();
        })
        .catch((error) => console.error("Error Editing profile:", error));
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard">
            <img
              className="me-2"
              src={logo}
              alt=""
              style={{ height: "30px" }}
            />
            Our Space
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/dashboard">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/all">
                All
              </Nav.Link>
              <Nav.Link as={Link} to="/message">
                Chat
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </Nav>

            <Form className="d-flex">
              <NavDropdown
                title="Account"
                className="text-white"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item onClick={handleShow}>
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleDelete(uId);
                  }}
                >
                  Delete Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="User Name"
              onChange={(e) => {
                setNewData({ ...newData, username: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setNewData({ ...newData, password: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setNewData({ ...newData, desc: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="City"
              onChange={(e) => {
                setNewData({ ...newData, city: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Home Town"
              onChange={(e) => {
                setNewData({ ...newData, from: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="file"
              placeholder="Profile Pic"
              onChange={(e) => {
                setNewData({ ...newData, profilePicture: e.target.files[0] });
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="Save Changes"
            onClick={() => {
              handleEdit(userId);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
