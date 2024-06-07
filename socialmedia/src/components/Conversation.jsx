import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../baseUrl";

function Conversation({ conversation, currentUser }) {
  const [cUserId, setCUserId] = useState(
    sessionStorage.getItem("existingUser")
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== cUserId);
    const getUser = async () => {
      try {
        const res = await axios(`${BASE_URL}/api/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      <div className="conversations m-2">
        <img
          src={
            user
              ? `${BASE_URL}/${user?.profilePicture}`
              : "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
          }
          alt=""
          style={{ width: "50px" }}
        />
        <span className="ps-2">{user?.username}</span>
      </div>
    </>
  );
}

export default Conversation;
