import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './UserSlice/userSlice.js'
import userMembershipReducer from "./UserMemberSlice.js/userMemberSlice.js"
import userBookReducer from "./UserBookSlice/userBookSlice.js"
import adminReducer from "./AdminSlice/adminSlice.js"

// Persist configs for all slices
const adminPersistConfig = {
  key: 'admin',
  storage,
}

const userPersistConfig = {
  key: 'user',
  storage,
}

const userMembershipPersistConfig = {
  key: 'userMembership',
  storage,
}

const userBookPersistConfig = {
  key: 'userBook',
  storage,
}

// Apply persistReducer to all slices
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer)
const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
const persistedUserMembershipReducer = persistReducer(userMembershipPersistConfig, userMembershipReducer)
const persistedUserBookReducer = persistReducer(userBookPersistConfig, userBookReducer)

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    userMembership: persistedUserMembershipReducer,
    userBook: persistedUserBookReducer,
    admin: persistedAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
export default store