import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthValue } from "./AuthContext";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsTimerActive } = useAuthValue();
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      //if response === 400 user not found error
      if (!auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
        setIsTimerActive(true);
        navigate("/verify-email");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <form onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
        <p>
          Not a member? Click here to <Link to="/register">register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
