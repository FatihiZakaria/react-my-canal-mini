import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/movies/moviesSlice";
import movieDetailsReducer from "./features/movieDetails/movieDetailsSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
