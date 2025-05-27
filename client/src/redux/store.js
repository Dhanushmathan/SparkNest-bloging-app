import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

// Import your reducers here

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    // Optional: Add middleware, devTools, etc.
});

export default store;