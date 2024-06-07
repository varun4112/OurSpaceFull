import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/ourspace1.png";
import axios from "axios";                
import { IsLoginContext } from "../Context/IsLogin";
import { useContext } from "react";
import { BASE_URL } from "../baseUrl";

function Login({ register }) {
  const { isLogin, setIsLogin } = useContext(IsLoginContext);
  const isRegisterForm = register ? true : false;
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      alert("Please Enter All Fields");
    } else {
      try {
        const result = await axios.post(`${BASE_URL}/api/auth/register`, {
          username: userName,
          email,
          password,
        });
        console.log(result);
        console.log(result.data.username);
        if (result.status === 200) {
          sessionStorage.setItem(
            "existingUser",
            JSON.stringify(result.data._id)
          );
          alert("Registered Successfully");
          navigate("/");
          setUserName("");
          setEmail("");
          setPassword("");
        }
      } catch (err) {
        alert("Registration Failed");
        console.error(err);
      }
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("PLease Enter All Feilds");
    } else {
      axios
        .post(`${BASE_URL}/api/auth/login`, { email, password })
        .then((result) => {
          console.log("RESULT", result);
          if (result.status === 200) {
            alert("Login Sucessfully");
            setIsLogin(true);
            sessionStorage.setItem("existingUser", result.data._id);
            sessionStorage.setItem("existingUserId", result.data.username);
            sessionStorage.setItem("isLoggedIn", true);

            navigate("/dashboard");
            setEmail("");
            setPassword("");
          }
        })
        .catch((err) => {
          alert("Login Failed!!");
          console.log(err);
        });
    }
  };

  return (
    <>
      <div
        style={{ width: "100%" }}
        className="d-flex mt-5 pt-3 mb-5 justify-content-center align-items-center"
      >
        <div className="container w-75">
          <div className="card shadow  p-3 bg-dark">
            <div className=" row align-items-center">
              <div className="col-lg-6">
                <div className=" d-flex align-items-center flex-column">
                  <h2 className="text-white">Our Space</h2>
                  <h5 className="text-white">
                    {isRegisterForm
                      ? "Sign Up To Your Account"
                      : "Sign In To Your Account"}
                  </h5>
                  <Form className=" p-3 w-100">
                    {isRegisterForm && (
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter UserName"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </Form.Group>
                    )}
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    {isRegisterForm ? (
                      <div>
                        <Button
                          variant="success"
                          className="w-100"
                          onClick={handleRegister}
                        >
                          Sign Up
                        </Button>
                        <p className="text-white m-2">
                          Already Have an Account? Click Here to{" "}
                          <Link to={"/"}>Login</Link>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Button onClick={handleLogin} className="w-100">
                          Login
                        </Button>
                        <p className="text-white m-2">
                          New User? Click Here To{" "}
                          <Link to={"/register"}>Register </Link>
                        </p>
                      </div>
                    )}
                  </Form>
                </div>
              </div>

              <div className="col-lg-6">
                <img
                  src={logo}
                  alt=""
                  className="img img-fluid rounded-start w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
