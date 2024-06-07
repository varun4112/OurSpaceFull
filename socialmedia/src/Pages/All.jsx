import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Dropdown, Card } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import UserPost from "../components/UserPost";
import AllCard from "../components/AllCard";
import { BASE_URL } from "../baseUrl";

function All() {
  const [allPosts, setAllPosts] = useState([]);
  console.log(allPosts);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/posts/getall/all`)
      .then((response) => setAllPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      <Header loggedIn />
      <div className=" home">
        <Row>
          <Col className="col-3 d-none d-md-block">
            <Sidebar />
          </Col>
          <Col>
            <div className="container">
              <div
                className=" container card text-center mx-auto mt-3"
                style={{ maxWidth: "35rem" }}
              >
                <div className="card-body  ">
                  <h5 className="card-title">Search For Posts</h5>
                  <div className="d-flex text-center">
                    <Form.Control
                      type="search"
                      placeholder="Enter Keywords Eg: Food, Racing etc"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="primary">Search</Button>
                  </div>
                </div>
              </div>
              {allPosts?.length > 0
                ? allPosts.map((post) => <UserPost post={post} />)
                : "No Post To Display"}
            </div>
          </Col>
          <Col className="col-3 mt-3 d-none d-md-block">
            <AllCard />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default All;
