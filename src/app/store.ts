import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api.ts';

// Creating the Redux store using Redux Toolkit's configureStore function
export const store = configureStore({
    reducer: {
        // Adding the API reducer to the store
        // This allows the app to use the endpoints and caching functionality provided by RTK Query
        [api.reducerPath]: api.reducer,
    },
    // Customizing the middleware to include the api.middleware from RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware), // Ensures that API requests are intercepted and handled by RTK Query middleware
});

// Defining the RootState type, which represents the structure of the entire Redux state
// ReturnType gets the type of the value returned by store.getState() which is the state of the Redux store
export type RootState = ReturnType<typeof store.getState>;

// Defining the AppDispatch type to be used for dispatching actions from the store
// This ensures type safety when dispatching actions, making sure actions dispatched are valid
export type AppDispatch = typeof store.dispatch;

