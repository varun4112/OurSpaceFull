import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import UserPost from "../components/UserPost";
import { Link } from "react-router-dom";
import { BASE_URL } from "../baseUrl";

function Profile() {
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userIdFromStorage = sessionStorage.getItem("existingUser");
    if (userIdFromStorage) {
      console.log("Fetching all user Post");
      console.log("UserId:", userIdFromStorage);
      axios
        .get(`${BASE_URL}/api/posts/${userIdFromStorage}/user`)
        .then((response) => setAllPosts(response.data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, []);

  useEffect(() => {
    const userIdFromStorage = sessionStorage.getItem("existingUser");
    if (userIdFromStorage) {
      console.log("Fetching all user Post");
      console.log("UserId:", userIdFromStorage);
      axios
        .get(`${BASE_URL}/api/users/${userIdFromStorage}`)
        .then((response) => setUser(response.data))
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
              class="container mt-2 d-flex justify-content-center"
              style={{ maxWidth: "35rem" }}
            >
              <div class="card p-3 w-100">
                <div class="d-flex align-items-center">
                  <div class="image m-2">
                    <img
                      src={
                        user
                          ? `${BASE_URL}/${user?.profilePicture}`
                          : "No Image"
                      }
                      // src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                      class="rounded"
                      width="155"
                    />
                  </div>
                  <div class="ml-3 w-100">
                    <h4 class="mb-0 mt-0"> {user.username}</h4>
                    <span>{user.desc}</span>
                    <br />
                    <span>{user.city}</span>

                    <div
                      className="d-flex text-center justify-content-around p-2"
                      style={{
                        border: "1px solid silver",
                        borderRadius: "4px",
                      }}
                    >
                      <div>
                        <div>{user.following?.length}</div>
                        <div>Following</div>
                      </div>
                      <div>
                        <div>{user.followers?.length}</div>
                        <div>Followers</div>
                      </div>
                      <div></div>
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

export default Profile;
