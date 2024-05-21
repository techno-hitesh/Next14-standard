import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState ={
    users:"",
    cartId:""
}
const userSlices = createSlice({
    name:"addUserSlice",
    initialState,
    reducers:{
        addUser(state, action){
            // console.log("action--",action)
            const data={
                id:nanoid(),
                data:action.payload
            }
            state.users =data;
        },
        addCartId(state, action){
            console.log("add cart Id action--",action)
            const data={
                id:nanoid(),
                data:action.payload
            }
            state.cartId = data;
        },
        removeUser(state, action){},
        deleteUsers(state,action){}
    }
})

// console.log(userSlices.actions)

export default userSlices.reducer;

export const { addUser,removeUser,deleteUsers,addCartId}  = userSlices.actions;