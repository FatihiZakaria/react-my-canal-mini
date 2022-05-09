type genre = {
  id: number;
  name: string;
};

type spokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Movie = {
  id: number;
  backdrop_path: string;
  vote_count: number;
  title: string;
  vote_average: number;
  release_date: string;
  original_language: string;
  popularity: number;
};

export type HttpMovies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetails = {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  genres: genre[];
  adult: boolean;
  original_language: string;
  spoken_languages: spokenLanguage[];
  vote_average: number;
  vote_count: number;
  status: string;
};
