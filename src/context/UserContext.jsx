import { createContext, useContext, useState } from "react";

const UserDetailContext = createContext();
const UserDetail = () => useContext(UserDetailContext);

const UserDetailProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  var getArr = JSON.parse(localStorage.getItem("users") || "[]")

  const [data, setData] = useState(getArr);
  return (
    <UserDetailContext.Provider value={{ userData, setUserData ,data, setData}}>
      {children}
    </UserDetailContext.Provider>
  );
};
export { UserDetailProvider, UserDetail };
