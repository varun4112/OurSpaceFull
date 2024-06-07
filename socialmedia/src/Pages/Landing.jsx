import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import Header from "../components/Header";
import axios from "axios";
import UserPost from "../components/UserPost";
import { Link } from "react-router-dom";
import AllCard from "../components/AllCard";
import { addPostResponseContext } from "../Context/ContextShare";
import { BASE_URL } from "../baseUrl";

function Landing() {
  const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const { addPostResponse, setAddPostResponse } = useContext(
    addPostResponseContext
  );

  // FETCHING TIMELINE
  useEffect(() => {
    const userIdFromStorage = sessionStorage.getItem("existingUser");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
      // console.log("Fetching all friends Post");
      // console.log("UserId:", userIdFromStorage);
      axios
        .get(`${BASE_URL}/api/posts/timeline/all`, {
          params: { userId: userIdFromStorage },
        })
        .then((response) => setAllPosts(response.data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [addPostResponse]);

  return (
    <>
      <Header loggedIn />
      <div>
        <Row>
          <Col className="col-3 d-none d-md-block">
            <Sidebar />
          </Col>
          <Col>
            <CreatePost />

            {allPosts?.length > 0 ? (
              allPosts.map((post) => <UserPost post={post} />)
            ) : (
              <h4 className="text-center">No Post To Display</h4>
            )}
          </Col>
          <Col className="col-3 mt-3 d-none d-md-block">
            <AllCard />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Landing;
