import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  user:null,
  error:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setUser(state, action){
      state.user = action.payload
    },
    removeUser(state){
      state.user = null
    },
    registerStart(state){
      state.error = null;
    },
    registerSuccess(state,action){
      state.user = action.payload;
    },
    registerFailure(state,action){
      state.error = action.payload;
    }
  }

})

export const {setUser, removeUser, registerStart, registerSuccess, registerFailure} = authSlice.actions;
export default authSlice.reducer