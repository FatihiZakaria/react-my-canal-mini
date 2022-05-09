import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../../app/features/movieDetails/movieDetailsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { useEffectOnce } from "../../../useEffectOnce";

const MoviesDetails: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const movieId: number = id ? parseInt(id, 10) : 0;
  const state = useAppSelector((state: RootState) => state.movieDetails);
  const { value, loading, error } = state;

  useEffectOnce(() => {
    dispatch(fetchMovieDetails(movieId));
  }, movieId);

  return (
    <>
      {loading === "pending" && (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only" data-testid="loading-id">
            Loading...
          </span>
        </div>
      )}
      {error && (
        <div className="p-3 mb-2 bg-danger text-white" data-testid="error-id">
          {error}
        </div>
      )}
      <div className="container-fluid bg-dark.bg-gradient ">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-9 pr-5">
              <div className="car-img-over">
                <img
                  className="card-img"
                  src={
                    value?.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${value?.poster_path}`
                      : ""
                  }
                  alt=""
                />
              </div>

              <div className="bg-color-gray text-left mt-2">
                <h3
                  className="font-weight-bold text-center"
                  data-testid="title-movie-id"
                >
                  {value?.title}
                </h3>
                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold">Overview</span>
                  </div>
                  <div className="col mr-3">
                    <span>{value?.overview}</span>
                  </div>
                </div>
                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold ">
                      Release date
                    </span>
                  </div>
                  <div className="col mr-3">
                    <span>{value?.release_date}</span>
                  </div>
                </div>
                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold ">Genres</span>
                  </div>
                  <div className="col mr-3">
                    <ul className="mb-2">
                      {value?.genres?.map((g) => (
                        <li key={g.id} className="ml-3">
                          {g.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold ">Adult</span>
                  </div>
                  <div className="col mr-3">
                    <span>{value?.adult ? "Yes" : "No"}</span>
                  </div>
                </div>

                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold ">
                      original_language
                    </span>
                  </div>
                  <div className="col mr-3">
                    <span>{value?.original_language.toUpperCase()}</span>
                  </div>
                </div>

                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold ">
                      spoken_languages
                    </span>
                  </div>
                  <div className="col mr-3">
                    <ul className="mb-2">
                      {value?.spoken_languages?.map((s) => (
                        <li key={s.english_name} className="ml-3">
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold ">
                      vote_average
                    </span>
                  </div>
                  <div className="col mr-3">
                    <span>{value?.vote_average}</span>
                  </div>
                </div>

                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold ">
                      vote_count
                    </span>
                  </div>
                  <div className="col mr-3">
                    <span>{value?.vote_count}</span>
                  </div>
                </div>

                <div className="row mt-3 ml-3">
                  <div className="col">
                    <span className="fw-bold font-weight-bold ">status</span>
                  </div>
                  <div className="col mr-3">
                    <span>{value?.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesDetails;
