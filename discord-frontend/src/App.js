import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
// We are using Matrial UI for the icons so here we are importing the icons
import ExpandMore from "@material-ui/icons/ExpandMore";
import Chat from "./Chat";
import { selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

// redux is like the data layer around the app ... production level data layout
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      //  authentications part
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  console.log(user);

  return (
    <div className="app">
      {/* like if/else condition if the user logged in or not... */}
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
