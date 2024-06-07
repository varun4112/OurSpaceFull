import React, { useState } from "react";
import { format } from "timeago.js";

function MessageBubble({ message, own }) {
  const [user, setUser] = useState(sessionStorage.getItem("existingUser"));
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: own ? "flex-end" : "flex-start",
        }}
      >
        <div className="messageTop d-flex " style={{ maxWidth: "300px" }}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
            alt=""
            height={"40px"}
            style={{ margin: "0" }}
          />
          <p
            className={
              own
                ? "messageText p-2 bg-success text-white"
                : "messageText p-2 bg-info text-white"
            }
            style={{ maxWidth: "300px", margin: "0" }}
          >
            {message?.text}
          </p>
        </div>

        <div className="messageBottom">
          <p>{format(message?.createdAt)}</p>
        </div>
      </div>
    </>
  );
}

export default MessageBubble;
