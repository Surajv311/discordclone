import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";

// since we have imported redux as well in the project as well
export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
