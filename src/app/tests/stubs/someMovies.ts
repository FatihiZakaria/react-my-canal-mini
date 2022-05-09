import { HttpMovies } from "../../../hexagon/models/movie.interface";

export const someMoviesValue = [
  {
    backdrop_path: "/ohfWCHT65P7b3kQvZnoy2BL95MB.jpg",
    id: 1250,
    original_language: "en",
    popularity: 58.802,
    release_date: "2007-01-15",
    title: "Ghost Rider",
    vote_average: 5.5,
    vote_count: 4855,
  },
  {
    backdrop_path: "/aHc765LRg5d5DtoS4LKiGEROWrq.jpg",
    id: 71676,
    original_language: "en",
    popularity: 84.589,
    release_date: "2011-12-11",
    title: "Ghost Rider: Spirit of Vengeance",
    vote_average: 5,
    vote_count: 3121,
  },
];
export const someMovies: HttpMovies = {
  page: 1,
  results: someMoviesValue,
  total_pages: 1,
  total_results: 2,
};
