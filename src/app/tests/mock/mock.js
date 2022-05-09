import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  ALL_MOVIES_ENDPOINT,
  API_KEY,
  API_URL,
  GET_MOVIE_DETAILS_URL,
} from "../../../config";
import { someMovies } from "../../../app/tests/stubs/someMovies";
import { someMovieDetails } from "../../../app/tests/stubs/someMovieDetails";

export const mock = new MockAdapter(axios);

export const mockNetworkResponseSucessAll = () => {
  mock
    .onGet(
      `${API_URL}${ALL_MOVIES_ENDPOINT}?api_key=${API_KEY}&sort_by=popularity.desc&page=1&query='rider'`
    )
    .reply(200, someMovies);
};

export const mockNetworkResponseFailedAll = () => {
  mock
    .onGet(
      `${API_URL}${ALL_MOVIES_ENDPOINT}?api_key=${API_KEY}&sort_by=popularity.desc&page=1&query='rider'`
    )
    .reply(404, {
      status_code: 34,
      status_message: "The resource you requested could not be found.",
      success: false,
    });
};

export const mockNetworkResponseSucessDetails = (id) => {
  mock
    .onGet(GET_MOVIE_DETAILS_URL.replace("{id}", id.toString()))
    .reply(200, someMovieDetails);
};

export const mockNetworkResponseFailedDetails = (id) => {
  mock.onGet(GET_MOVIE_DETAILS_URL.replace("{id}", id.toString())).reply(404, {
    status_code: 34,
    status_message: "The resource you requested could not be found.",
    success: false,
  });
};
