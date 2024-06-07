import React, { createContext, useEffect, useState } from "react";

export const IsLoginContext = createContext();

function IsLogin({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
        {children}
      </IsLoginContext.Provider>
    </>
  );
}

export default IsLogin;
