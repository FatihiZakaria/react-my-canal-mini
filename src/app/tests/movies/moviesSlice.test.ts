import { fetchMovies, initialState } from "../../features/movies/moviesSlice";
import { store } from "../../store";
import {
  mock,
  mockNetworkResponseFailedAll,
  mockNetworkResponseSucessAll,
} from "../mock/mock";
import { someMoviesValue } from "../stubs/someMovies";

let stateMovies;

describe("Movies redux state tests", () => {
  afterEach(() => {
    mock.reset();
  });

  it("Should movies state to equal initialState", () => {
    const state = store.getState().movies;
    expect(state).toEqual(initialState);
  });

  it("Should loading to be pending after dispatch action", () => {
    store.dispatch(fetchMovies());
    stateMovies = store.getState().movies;
    expect(stateMovies.loading).toEqual("pending");
  });

  it("Should movies state have someMovies", async () => {
    mockNetworkResponseSucessAll();
    await store.dispatch(fetchMovies());
    stateMovies = store.getState().movies;

    expect(stateMovies.loading).toEqual("idle");
    expect(stateMovies.value).toEqual(someMoviesValue);
    expect(stateMovies.error).toEqual("");
    expect(stateMovies.page).toEqual(1);
    expect(stateMovies.totalPages).toEqual(1);
    expect(stateMovies.totalResults).toEqual(2);
  });

  it("Should movies state have error", async () => {
    mockNetworkResponseFailedAll();
    await store.dispatch(fetchMovies());
    stateMovies = store.getState().movies;

    expect(stateMovies.loading).toEqual("failed");
    expect(stateMovies.value).toEqual([]);
    expect(stateMovies.error).toEqual("Request failed with status code 404");
    expect(stateMovies.page).toEqual(1);
    expect(stateMovies.totalPages).toEqual(0);
    expect(stateMovies.totalResults).toEqual(0);
  });
});
