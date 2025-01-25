import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userBook: [],
    
}

export const userBookSlice = createSlice({
    name: "userBook",
    initialState,
    reducers: {
        setUserBook: (state, action) => {
            const newBook = action.payload;
            state.userBook = {
                ...state.userBook,
                ...newBook
            };
        },
       

        removeUserBook: (state) => {
            state.userBook = {};
        }
    }
}) 

export const { setUserBook, removeCurrrntBooksInBag } = userBookSlice.actions;
export default userBookSlice.reducer;
