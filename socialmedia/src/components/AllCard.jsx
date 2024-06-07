import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { editProfileResponseContext } from "../Context/ContextShare";
import { BASE_URL } from "../baseUrl";

// CURRENT PROFILE INFO CARD
function AllCard() {
  const [user, setUser] = useState({});
  const { editProfileResponse, setEditProfileResponse } = useContext(
    editProfileResponseContext
  );

  useEffect(() => {
    const userIdFromStorage = sessionStorage.getItem("existingUser");
    if (userIdFromStorage) {
      console.log("INFOCARD:Fetching all user Data");
      console.log("UserId:", userIdFromStorage);
      axios
        .get(`${BASE_URL}/api/users/${userIdFromStorage}`)
        .then((response) => setUser(response.data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [editProfileResponse]); //
  return (
    <div>
      <Card style={{ width: "18rem" }} className="text-center">
        <Card.Img
          variant="top"
          className="text-center px-5 pt-5 rounded"
          src={
            user.profilePicture
              ? `${BASE_URL}/${user.profilePicture}`
              : "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
          }
        />
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>
            <div>{user.desc}</div>
            <div>{user.city}</div>
            <div>From:{user.from}</div>
            <div className="d-flex justify-content-evenly">
              <div className="m-2">
                <div>{user.followers?.length}</div>
                <div>Followers</div>
              </div>
              <div className="m-2">
                <div>{user.following?.length}</div>
                <div>Following</div>
              </div>
            </div>
          </Card.Text>
          <Button
            variant="outline-primary"
            className="mx-auto"
            as={Link}
            to="/profile"
          >
            VIEW PROFILE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AllCard;
