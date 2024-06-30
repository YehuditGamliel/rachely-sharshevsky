import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('racheli');
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      console.log(data);
      let response = await fetch(`http://localhost:8082/authorization/loginManager`, {
        method: 'POST',
        body: JSON.stringify({
           userName: data.userName,
          password: data.password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    return response.json();
     
  
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