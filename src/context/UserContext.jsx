import { createContext, useContext, useState } from "react";

const UserDetailContext = createContext();
const UserDetail = () => useContext(UserDetailContext);

const UserDetailProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  return (
    <UserDetailContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDetailContext.Provider>
  );
};
export { UserDetailProvider, UserDetail };
