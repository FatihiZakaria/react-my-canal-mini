import { HttpMoviesGateway } from "../../../adapters/secondary/httpGateways/movies/httpMoviesGateway";
import { MovieDetails } from "../../models/movie.interface";

const httpMoviesGateway = new HttpMoviesGateway();

export const getMovieDetailsUseCase = async (
  id: number
): Promise<MovieDetails> => {
  return await httpMoviesGateway.requestMovieDetailsById(id);
};
