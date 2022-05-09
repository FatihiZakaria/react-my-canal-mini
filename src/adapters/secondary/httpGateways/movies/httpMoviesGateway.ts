import axios from "axios";
import {
  ALL_MOVIES_ENDPOINT,
  API_KEY,
  API_URL,
  GET_MOVIE_DETAILS_URL,
} from "../../../../config";
import { MoviesGateway } from "../../../../hexagon/gateways/moviesGateway.interface";
import {
  HttpMovies,
  MovieDetails,
} from "../../../../hexagon/models/movie.interface";

export class HttpMoviesGateway implements MoviesGateway {
  async requestAllMovies(page: number): Promise<HttpMovies> {
    const response = await axios.get(
      `${API_URL}${ALL_MOVIES_ENDPOINT}?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}&query='rider'`
    );
    return response.data;
  }
  async requestMovieDetailsById(id: number): Promise<MovieDetails> {
    const response = await axios.get(
      GET_MOVIE_DETAILS_URL.replace("{id}", id.toString())
    );
    return response.data;
  }
}
