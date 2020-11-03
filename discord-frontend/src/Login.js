import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";

const Login = () => {
  const signIn = () => {
    // login with google

    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png"
          alt="discord logo"
        />
      </div>

      {/* it would fire off the sign in  */}
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
