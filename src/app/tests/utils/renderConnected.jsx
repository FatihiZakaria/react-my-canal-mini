import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import moviesReducer from "../../features/movies/moviesSlice";
import { Route, MemoryRouter, Routes } from "react-router-dom";
import movieDetailsReducer from "../../features/movieDetails/movieDetailsSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { movies: moviesReducer, movieDetails: movieDetailsReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export const renderWithRouter = ({ children }) =>
  render(
    <MemoryRouter initialEntries={["/movie/71676"]}>
      <Routes>
        <Route path="/movie/:id" element={children} />
      </Routes>
    </MemoryRouter>
  );

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
