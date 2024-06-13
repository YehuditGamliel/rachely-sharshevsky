import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  // const loginAction = async (data) => {
  //   try {
      
  //     { console.log(data)}
  //     const response = await fetch(`http://localhost:8082/authorization/loginManager`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         "userName":"Racheli",
  //           "password":"rS@61047"
  //         //  userName:data.userName,
  //         // // password: userDetails.password
  //         // // "email":"rsh61047@gmail.com",
  //         //   password:data.email.password
  //     }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const res = await response.json();
  //     if (res.data) {
  //       setUser(res.data.user);
  //       setToken(res.token);
  //       localStorage.setItem("site", res.token);
  //       navigate("/dashboard");
  //       return;
  //     }
  //     throw new Error(res.message);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const loginAction = async (data) => {
    try {
      console.log(data);
  
      const response = await fetch(`http://localhost:8082/authorization/loginManager`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //  userName:data.userName,
          //  password:data.password
          
          userName: "Racheli",
          password: "rS@61047"
        }),
      });
  
      const res = await response.json();
  
      if (res.data) {
        //how to do that
        // setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }
  
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/loginManager");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};