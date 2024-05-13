import { createSlice } from "@reduxjs/toolkit";

const userSlices = createSlice({
    name:"user",
    initialState:[],
    reducers:{
        addUser(state, action){
            state.push(action.payload);
            // console.log("action",state,action.payload)
        },
        removeUser(state, action){},
        deleteUsers(state,action){}
    }
})

// console.log(userSlices.actions)

export default userSlices.reducer;

export const { addUser,removeUser,deleteUsers}  = userSlices.actions;