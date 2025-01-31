import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   token : localStorage.getItem('token') || null,
   role : localStorage.getItem('role') || null,
   isLoggedIn : !!localStorage.getItem('token'),


}

const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers:{
      login:(state,action)=>{
       const {token,role} = action.payload
       state.token =token
       state.role = role
       state.isLoggedIn = true

       localStorage.setItem('token', token);
       localStorage.setItem('role', role);
      },
      logout: (state) => {
        state.token = null;
        state.role = null;
        state.isLoggedIn = false;
       
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      },
      
    }

})

export const {login,logout} = authSlice.actions

export default authSlice.reducer