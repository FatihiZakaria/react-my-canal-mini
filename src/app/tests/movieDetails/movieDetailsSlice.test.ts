import {
  fetchMovieDetails,
  initialState,
} from "../../features/movieDetails/movieDetailsSlice";
import { store } from "../../store";
import { someMovieDetails } from "../stubs/someMovieDetails";
import {
  mock,
  mockNetworkResponseFailedDetails,
  mockNetworkResponseSucessDetails,
} from "../mock/mock";

let stateMovieDetails;
const id = 71676;

describe("Movie Details redux state tests", () => {
  afterEach(() => {
    mock.reset();
  });

  it("Should movie details state to equal initialState", () => {
    const state = store.getState().movieDetails;
    expect(state).toEqual(initialState);
  });

  it("Should loading to be pending after dispatch action", () => {
    store.dispatch(fetchMovieDetails(id));
    stateMovieDetails = store.getState().movieDetails;
    expect(stateMovieDetails.loading).toEqual("pending");
  });

  it("Should movie details state have someMovieDetails", async () => {
    mockNetworkResponseSucessDetails(id);
    await store.dispatch(fetchMovieDetails(id));
    stateMovieDetails = store.getState().movieDetails;

    expect(stateMovieDetails.loading).toEqual("idle");
    expect(stateMovieDetails.value).toEqual(someMovieDetails);
    expect(stateMovieDetails.error).toEqual("");
  });

  it("Should movie details state have error", async () => {
    mockNetworkResponseFailedDetails(id);
    await store.dispatch(fetchMovieDetails(id));
    stateMovieDetails = store.getState().movieDetails;

    expect(stateMovieDetails.loading).toEqual("failed");
    expect(stateMovieDetails.value).toEqual(null);
    expect(stateMovieDetails.error).toEqual(
      "Request failed with status code 404"
    );
  });
});
