import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../baseUrl";

function OnlineUser({ onlineUsers, setCurrentChat }) {
  const [userId, setUserId] = useState(sessionStorage.getItem("existingUser"));
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  console.log("friends", friends);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${BASE_URL}/api/users/${userId}/friends`);
      setFriends(res.data);
    };
    getFriends();
  }, [userId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  return (
    <>
      <div className="conversations m-2">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
          alt=""
          style={{ width: "50px" }}
        />
        <span className="ps-2">John Maverick</span>
      </div>
    </>
  );
}

export default OnlineUser;
