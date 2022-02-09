import { useState, useEffect } from "react";
import { useAuthValue } from "./AuthContext";
import { auth } from "./firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = (props) => {
  const { currentUser } = useAuthValue();
  //console.log("current user from verify page: ", currentUser);

  const resendVerificationEmailHandler = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setIsTimerActive(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const [time, setTime] = useState(60);
  const { isTimerActive, setIsTimerActive } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        .reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate("/profile");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval;
    if (time !== 0 && isTimerActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTime(60);
      setIsTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time, isTimerActive, setIsTimerActive]);

  return (
    <div>
      <h1>VERIFY EMAIL PAGE</h1>
      <div>
        <p>
          We sent the verification email to: <span>{currentUser?.email}</span>
        </p>
      </div>
      <button onClick={resendVerificationEmailHandler} disabled={isTimerActive}>
        Resend Verification email {isTimerActive && time}
      </button>
    </div>
  );
};

export default VerifyEmail;
