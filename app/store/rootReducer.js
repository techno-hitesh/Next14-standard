import { combineReducers } from "@reduxjs/toolkit";
import  userSlicer from "./slices/userSlicer"


const rootReducer = combineReducers({
    users: userSlicer,
});
  
export default rootReducer;