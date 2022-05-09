import { MovieDetails } from "../../../hexagon/models/movie.interface";

export const someMovieDetails: MovieDetails = {
  adult: false,
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 53,
      name: "Thriller",
    },
  ],
  id: 71676,
  original_language: "en",
  overview:
    "When the devil resurfaces with aims to take over the world in human form, Johnny Blaze reluctantly comes out of hiding to transform into the flame-spewing supernatural hero Ghost Rider -- and rescue a 10-year-old boy from an unsavory end.",
  poster_path: "/fDtIZXLNreDHk3mOskJYABrQNOQ.jpg",
  release_date: "2011-12-11",
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Released",
  title: "Ghost Rider: Spirit of Vengeance",
  vote_average: 5,
  vote_count: 3121,
};
