import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userMemberShip: null,
};

export const userMemberShipSlice = createSlice({
    name: "userMemberShip",
    initialState,
    reducers: {
        setUserMemberShip: (state, action) => {
            state.userMemberShip = action.payload;
        },
        removeUserMemberShip: (state) => {
            state.userMemberShip = null;
        }
    }
})

export const { setUserMemberShip, removeUserMemberShip } = userMemberShipSlice.actions;
export default userMemberShipSlice.reducer;
