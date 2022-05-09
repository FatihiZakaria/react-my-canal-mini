import { HttpMovies, MovieDetails } from "../models/movie.interface";

export interface MoviesGateway {
  requestAllMovies(page: number): Promise<HttpMovies>;
  requestMovieDetailsById(id: number): Promise<MovieDetails>;
}
