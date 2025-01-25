import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    admin : null,
    accessToken : null,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.admin = null;
            state.accessToken = null;
        }
    },
})

export const {setAdmin, setAccessToken, logout} = adminSlice.actions;
export default adminSlice.reducer;