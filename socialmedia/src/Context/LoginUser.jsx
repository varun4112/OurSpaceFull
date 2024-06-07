import React, { createContext, useEffect, useState } from "react";

export const LoginUserContext = createContext();

function LoginUser({ children }) {
  const [loginUser, setLoginUser] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedLoggedUser = sessionStorage.getItem("existingUser");
    setLoginUser(storedLoggedUser);
  }, []);

  return (
    <>
      <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
        {children}
      </LoginUserContext.Provider>
    </>
  );
}

export default LoginUser;
