import React from "react";
import "@testing-library/jest-dom";
import MovieDetails from "./MoviesDetails";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  renderWithRouter,
  screen,
} from "../../../app/tests/utils/renderConnected";
import { waitFor } from "@testing-library/dom";
import {
  mockNetworkResponseFailedDetails,
  mockNetworkResponseSucessDetails,
  mock,
} from "../../../app/tests/mock/mock";
//import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Movie Details component test", () => {
  const originalError = console.error;
  beforeAll(() => {
    // skip error act - React 18
    jest.spyOn(console, "error").mockImplementation((...args) => {
      if (typeof args[0] === "string" && args[0].includes("act")) {
        return;
      }
      return originalError.call(console, args);
    });
  });
  afterEach(() => {
    mock.reset();
  });
  it("Should empty result", () => {
    render(
      <Router>
        <MovieDetails />
      </Router>
    );
    expect(screen.getByTestId("loading-id")).toHaveTextContent(/Loading.../i);
    expect(screen.getByTestId("title-movie-id")).toHaveTextContent("");
  });

  it("Should have result with mock react dom", async () => {
    mockNetworkResponseSucessDetails(71676);
    const history = createMemoryHistory();
    const route = "/movie/71676";
    history.push(route);
    renderWithRouter({ children: <MovieDetails /> });
    await waitFor(() => {
      expect(screen.getByTestId("loading-id")).toHaveTextContent(/Loading.../i);
    });
    await waitFor(() => {
      expect(screen.getByTestId("title-movie-id")).toHaveTextContent(
        /Ghost Rider: Spirit of Vengeance/i
      );
    });
  });

  it("Should have error", async () => {
    mockNetworkResponseFailedDetails(71676);
    const history = createMemoryHistory();
    const route = "/movie/71676";
    history.push(route);
    renderWithRouter({ children: <MovieDetails /> });
    await waitFor(() => {
      expect(screen.getByTestId("error-id")).toHaveTextContent(
        /Request failed with status code 404/i
      );
    });
  });
});
