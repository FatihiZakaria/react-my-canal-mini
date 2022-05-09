import React from "react";
import "@testing-library/jest-dom";
import Movies from "./Movies";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "../../../app/tests/utils/renderConnected";
import { waitFor } from "@testing-library/dom";
import {
  mockNetworkResponseFailedAll,
  mockNetworkResponseSucessAll,
  mock,
} from "../../../app/tests/mock/mock";

describe("Movies component test", () => {
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
        <Movies />
      </Router>
    );
    expect(screen.getByTestId("loading-id")).toHaveTextContent(/Loading.../i);
    expect(screen.getByTestId("total-results-id")).toHaveTextContent(
      /Total results (0)/i
    );
  });

  it("Should have result", async () => {
    mockNetworkResponseSucessAll();
    render(
      <Router>
        <Movies />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading-id")).toHaveTextContent(/Loading.../i);
    });

    await waitFor(() => {
      expect(screen.getByTestId("total-results-id")).toHaveTextContent(
        /Total results (2)/i
      );
    });

    const getAllMovies = await screen.findAllByTestId("movie-id");
    expect(getAllMovies.length).toEqual(2);
    expect(getAllMovies[0].getAttribute("id")).toEqual("movie-id-1250");
    expect(getAllMovies[1].getAttribute("id")).toEqual("movie-id-71676");
  });

  it("Should have error", async () => {
    mockNetworkResponseFailedAll();
    render(
      <Router>
        <Movies />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error-id")).toHaveTextContent(
        /Request failed with status code 404/i
      );
    });

    await waitFor(() => {
      expect(screen.queryByTestId("movie-id")).not.toBeInTheDocument();
    });
  });
});
