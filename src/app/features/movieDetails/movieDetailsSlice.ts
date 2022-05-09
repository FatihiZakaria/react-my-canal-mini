import { MovieDetails } from "../../../hexagon/models/movie.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieDetailsUseCase } from "../../../hexagon/usescases/getMovieDetails/getMovieDetailsUseCase";

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchDetailsStatus",
  async (id: number) => {
    return getMovieDetailsUseCase(id);
  }
);

export interface MovieDetailsState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  value: MovieDetails | null;
  error: string | undefined;
}

export const initialState: MovieDetailsState = {
  loading: "idle",
  value: null,
  error: "",
};

export const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieDetails.pending, (state, action) => {
      state.loading = "pending";
      state.value = null;
      state.error = "";
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.loading = "idle";
      state.value = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
      state.value = null;
    });
  },
});

export default movieDetailsSlice.reducer;
