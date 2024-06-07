import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import { addFriendsResponseContext } from "../Context/ContextShare";
import { BASE_URL } from "../baseUrl";

function Userprofile() {
  const { addFriendsResponse, setAddFriendsResponse } = useContext(
    addFriendsResponseContext
  );
  const { userId } = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  console.log("user usp", user);
  const [baseUrl, setBaseUrl] = useState("http://localhost:4000/");
  // console.log("user", user);
  const [followStatus, setFollowStatus] = useState("");
  console.log(user);

  const handleFollow = async () => {
    const userIdFromStorage = sessionStorage.getItem("existingUser");
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/${userId}/follow`,
        {
          userId: userIdFromStorage,
        }
      );
      setFollowStatus(response.data);
      setAddFriendsResponse(response);
      handleConversation();
      alert("User Followed");
    } catch (error) {
      console.error("Error following user:", error);
      alert(error);
    }
  };

  const handleUnfollow = async (userToFollow) => {
    const userIdFromStorage = sessionStorage.getItem("existingUser"); // Retrieve user ID from sessionStorage
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/${userToFollow}/unfollow`, // Use userToFollow in the URL
        {
          userId: userIdFromStorage, // Pass userIdFromStorage as payload to indicate who is performing the unfollow action
        }
      );
      // Assuming setAddFriendsResponse and setFollowStatus are defined elsewhere
      setAddFriendsResponse(response); // Set response data
      setFollowStatus(response.data); // Set follow status based on response data
      alert("User Unfollowed"); // Alert user that unfollow was successful
    } catch (error) {
      console.error("Error unfollowing user:", error); // Log error to console
      alert("Error unfollowing user"); // Alert user with error message
    }
  };

  const handleConversation = async () => {
    const userIdFromStorage = sessionStorage.getItem("existingUser");

    const requestBody = {
      senderId: userIdFromStorage,
      recieverId: userId,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/conversations/`,
        requestBody
      );
      console.log("Message sent:", response.data);
      // alert("conv");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      console.log("Fetching all user Post");
      // console.log("UserId:", userId);
      axios
        .get(`${BASE_URL}/api/posts/${userId}/user`)
        .then((response) => setAllPosts(response.data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("Fetching all user data");
      // console.log("UserId:", userId);
      axios
        .get(`${BASE_URL}/api/users/${userId}`)
        .then((response) => {
          setUser(response.data);
          console.log("user", user);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, []); //

  return (
    <>
      <Header />
      <div className="container">
        <Row>
          <Col className="col-3 d-none d-md-block ">
            <Sidebar />
          </Col>
          <Col>
            <div
              class="container mx-auto mt-2 d-flex justify-content-center"
              style={{ maxWidth: "35rem" }}
            >
              <div class="card p-3 w-100">
                <div class="d-flex align-items-center">
                  <div class="image m-2">
                    <img
                      src={
                        user?.profilePicture
                          ? `${BASE_URL}/${user?.profilePicture}`
                          : "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                      }
                      // src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                      class="rounded"
                      width="155"
                    />
                  </div>
                  <div class="ml-3 w-100">
                    <h4 class="mb-0 mt-0">{user?.username}</h4>
                    <span>{user?.desc}</span>
                    <br />
                    <span>Hometown:{user?.from}</span>
                    <br />
                    <span>Current City:{user?.city}</span>
                    <div>
                      <Button className="mt-2" onClick={handleFollow}>
                        Follow
                      </Button>
                      <Button
                        className="mt-2 ms-2"
                        onClick={() => {
                          handleUnfollow(user?._id);
                        }}
                      >
                        UnFollow
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            {allPosts?.length > 0
              ? allPosts.map((post) => <UserPost post={post} />)
              : "No Post To Display"}
          </Col>
          <Col className="col-2 d-none d-md-block"></Col>
        </Row>
      </div>
    </>
  );
}

export default Userprofile;
