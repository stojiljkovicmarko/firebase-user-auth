import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthValue } from "./AuthContext.js";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsTimerActive } = useAuthValue();

  const navigate = useNavigate();

  const isPasswordMatching = () => {
    if (
      password.trim() !== "" &&
      repeatPassword.trim() !== "" &&
      password.trim() !== repeatPassword.trim()
    ) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const register = async (event) => {
    event.preventDefault();
    setError("");
    if (isPasswordMatching()) {
      try {
          //popraviti pamcenje mejla i pasvorda
          //kada dodje do greske state je "", a ostanu u input
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log("resp from createUser fn", res);
        await sendEmailVerification(
          auth.currentUser
        );
        setIsTimerActive(true);
        navigate("/verify-email");
      } catch (err) {
        console.log("greska uhvacena");
        setError(err.message);
      }
    }
    // setEmail("");
    // setPassword("");
    // setRepeatPassword("");
  };

  return (
    <div>
      <div>
        <h1>Register</h1>
        {error && <div>{error}</div>}
        <form onSubmit={register}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Confirm your password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <span>
          Already have an account?
          <Link to="/login">login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
