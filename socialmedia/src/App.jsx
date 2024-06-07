import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import All from "./Pages/All";
import "./bootstrap.min.css";
import Profile from "./Pages/Profile";
import Footer from "./components/Footer";
import Userprofile from "./Pages/Userprofile";
import { IsLoginContext } from "./Context/IsLogin";
import { useContext } from "react";
import Message from "./Pages/Message";

function App() {
  const { isLogin, setIsLogin } = useContext(IsLoginContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLogin ? <Landing /> : <Login />} />
        <Route
          path="/register"
          element={isLogin ? <Landing /> : <Login register />}
        />
        <Route element={isLogin ? <Landing /> : <Login />} path="/dashboard" />
        <Route element={isLogin ? <All /> : <Login />} path="/all" />
        <Route element={isLogin ? <Profile /> : <Login />} path="/profile" />
        <Route element={isLogin ? <Message /> : <Login />} path="/message" />
        <Route
          element={isLogin ? <Userprofile /> : <Login />}
          path="/userprofile/:userId"
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
