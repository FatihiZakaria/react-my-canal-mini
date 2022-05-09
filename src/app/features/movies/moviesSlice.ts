import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../../hexagon/models/movie.interface";
import { getMoviesListUseCase } from "../../../hexagon/usescases/getMoviesList/getMoviesListUseCase";
import { RootState } from "../../store";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMoviesStatus",
  async (args, { getState }) => {
    const state: RootState = getState() as RootState;
    const page = state.movies.page;
    return getMoviesListUseCase(page);
  }
);

export interface MoviesState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  value: Movie[];
  error: string | undefined;
  page: number;
  totalPages: number;
  totalResults: number;
}

export const initialState: MoviesState = {
  loading: "idle",
  value: [],
  error: "",
  page: 1,
  totalPages: 0,
  totalResults: 0,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = "pending";
      state.value = [];
      state.error = "";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = "idle";
      state.value = action.payload.results;
      state.error = "";
      state.totalPages = action.payload.total_pages;
      state.totalResults = action.payload.total_results;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
      state.value = [];
      state.page = 1;
      state.totalPages = 0;
      state.totalResults = 0;
    });
  },
});

export const { setPage } = moviesSlice.actions;

export default moviesSlice.reducer;
