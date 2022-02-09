import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuthValue } from "./authentication/AuthContext";
import { auth } from "./authentication/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import Register from "./authentication/Register";
import Login from "./authentication/Login";
import VerifyEmail from "./authentication/VerifyEmail";
import NotFound from "./authentication/NotFound";
import Profile from "./authentication/Profile";
import PrivateRoute from "./authentication/PrivateRoute";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  //console.log("from app: ", currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider value={{ currentUser, isTimerActive, setIsTimerActive }}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            {/* <Route path="/profile" element={<Profile />} />
            we replaced route to profile with private route */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
