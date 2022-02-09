import { useAuthValue } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const Profile = () => {
  const { currentUser } = useAuthValue();

  console.log("auth je: ", auth);

  console.log("curr user from profile: ", currentUser);

  const logoutHandler = () => {
    signOut(auth);
  };
  
  console.log(currentUser);

  return (
    <div>
      <h1>USER PROFILE PAGE</h1>
      <p>Email: {currentUser.email}</p>
      <p>Email verified: {currentUser.emailVerified.toString()}</p>
      <button onClick={logoutHandler}>LOGOUT</button>
    </div>
  );
};

export default Profile;
