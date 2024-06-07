import React, { createContext, useState } from "react";

export const addFriendsResponseContext = createContext();
export const editProfileResponseContext = createContext();
export const addPostResponseContext = createContext();
export const editPostResponseContext = createContext();

function ContextShare({ children }) {
  const [addFriendsResponse, setAddFriendsResponse] = useState({});
  const [editProfileResponse, setEditProfileResponse] = useState({});
  const [addPostResponse, setAddPostResponse] = useState({});
  const [editPostResponse, setEditPostResponse] = useState({});

  return (
    <addFriendsResponseContext.Provider
      value={{ addFriendsResponse, setAddFriendsResponse }}
    >
      <editProfileResponseContext.Provider
        value={{ editProfileResponse, setEditProfileResponse }}
      >
        <addPostResponseContext.Provider
          value={{ addPostResponse, setAddPostResponse }}
        >
          <editPostResponseContext.Provider
            value={{ editPostResponse, setEditPostResponse }}
          >
            {children}
          </editPostResponseContext.Provider>
        </addPostResponseContext.Provider>
      </editProfileResponseContext.Provider>
    </addFriendsResponseContext.Provider>
  );
}

export default ContextShare;
