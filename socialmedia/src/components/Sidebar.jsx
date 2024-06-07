import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { addFriendsResponseContext } from "../Context/ContextShare";
import { BASE_URL } from "../baseUrl";


function Sidebar() {
  const [user, setUser] = useState([]);
  const { addFriendsResponse, setAddFriendsResponse } = useContext(
    addFriendsResponseContext
  );

  useEffect(() => {
    const userIdFromStorage = sessionStorage.getItem("existingUser");
    if (userIdFromStorage) {
      console.log("Fetching all user Data");
      console.log("UserId:", userIdFromStorage);
      axios
        .get(`${ BASE_URL }/api/users/${userIdFromStorage}`)
        .then((response) => setUser(response.data.following))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [addFriendsResponse]); //
  return (
    <>
      <div className="container ms-2 mt-3 ">
        <Card style={{ width: "18rem" }} className="text-center">
          <Card.Body>
            <Card.Title>
              <h3>FRIENDS</h3>
            </Card.Title>
            <div>
              {user.map((follower, index) => (
                <>
                  <Button
                    variant="outline-white"
                    className="mb-1"
                    as={Link}
                    to={`/userprofile/${follower?.userId}`}
                  >
                    {follower.username}
                  </Button>
                  <br />
                </>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Sidebar;
