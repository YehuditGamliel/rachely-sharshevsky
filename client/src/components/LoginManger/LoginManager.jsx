import { useState } from "react";
import { useAuth } from "../../hook/AuthProvider.jsx";




const LoginManager = () => {
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });
    const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.userName !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("pleae provide a valid input");
  };


  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-name">userName:</label>
        <input
           type="text"
          id="user-name"
          name="userName"
          placeholder="example@yahoo.com"
          aria-describedby="user-name"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-name" className="sr-only">
          Please enter a valid name. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default LoginManager;