import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import Conversation from "../components/Conversation";
import MessageBubble from "../components/MessageBubble";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { io } from "socket.io-client";
import { BASE_URL } from "../baseUrl";

function Message() {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("existingUser"));
  const [conversations, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const scrollRef = useRef(null);
  // const socket = useRef(io("ws://localhost:8900"));

  // get Conversation
  useEffect(() => {
    setUser(sessionStorage.getItem("existingUser"));
    const getConversations = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/conversations/${user}`);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  // get messages for the current chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/message/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    setUser(sessionStorage.getItem("existingUser"));
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const senderid = sessionStorage.getItem("existingUser");
    const message = {
      sender: senderid,
      text: newMessage,
      ConversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== senderid
    );

    // socket.current.emit("sendMessage", {
    //   senderId: senderid,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      const res = await axios.post(`${BASE_URL}/api/message`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // useEffect(() => {
  //   const userSocket = sessionStorage.getItem("existingUser");
  //   socket.current.emit("addUser", userSocket);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, [user]);

  // useEffect(() => {
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  const [friends, setFriends] = useState([]);
  console.log("friends", friends);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${BASE_URL}/api/users/${userId}/friends`);
      setFriends(res.data);
    };
    getFriends();
  }, [userId]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  return (
    <>
      <Header />
      <div className="messenger container" style={{ minHeight: "70vh" }}>
        <Row>
          <Col className="col-2">
            <div className="chatMenu p-2 border-box">
              <input
                type="text"
                className="chatMenuInput p-1"
                placeholder="Search For Friends"
                style={{ border: "none", borderBottom: "1px Solid grey" }}
              />
              {conversations?.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  {" "}
                  <Conversation conversation={c} currentuser={user} />
                </div>
              ))}
            </div>
          </Col>
          <Col>
            {currentChat ? (
              <div>
                <div
                  className="chatBox p-2 m-2 border-box"
                  style={{ overflowY: "scroll", height: "70vh" }}
                  ref={scrollRef}
                >
                  {messages?.map((m) => (
                    <MessageBubble message={m} own={m.sender === userId} />
                  ))}
                </div>
                <div className="chatInput">
                  <InputGroup className="mb-3">
                    <Form.Control
                      style={{
                        border: "2px solid grey",
                        borderRight: "0",
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                        position: "sticky",
                        bottom: "0",
                      }}
                      placeholder="Type Your Message Here"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    />
                    <Button
                      variant="outline-success"
                      id="button-addon2"
                      onClick={handleSubmit}
                    >
                      Send
                    </Button>
                  </InputGroup>
                </div>
              </div>
            ) : (
              <h4 className="text-center p-5">
                Select a Conversation to start a Chat
              </h4>
            )}
          </Col>
          <Col className="col-2 d-none d-md-block"> </Col>
        </Row>
      </div>
    </>
  );
}

export default Message;
