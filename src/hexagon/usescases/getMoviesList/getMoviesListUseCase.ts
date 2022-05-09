import { HttpMoviesGateway } from "../../../adapters/secondary/httpGateways/movies/httpMoviesGateway";
import { HttpMovies } from "../../models/movie.interface";

const httpMoviesGateway = new HttpMoviesGateway();

export const getMoviesListUseCase = async (
  page: number
): Promise<HttpMovies> => {
  return await httpMoviesGateway.requestAllMovies(page);
};
