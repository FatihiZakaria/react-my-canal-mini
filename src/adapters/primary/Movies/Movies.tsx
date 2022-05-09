import { FunctionComponent } from "react";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../../app/store";
import { fetchMovies, setPage } from "../../../app/features/movies/moviesSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useEffectOnce } from "../../../useEffectOnce";
import { Movie } from "../../../hexagon/models/movie.interface";
import noimg from "../../../assets/images/noimg.png";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";

const Movies: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const state = useAppSelector((state: RootState) => state.movies);
  const { value, loading, totalResults, page, error, totalPages } = state;
  const showPagination = totalPages > 1;
  useEffectOnce(() => {
    dispatch(fetchMovies());
  }, null);

  const handleClick = (id: number) => {
    history(`/movie/${id}`);
  };

  const goToPage = (currentPage: number) => {
    dispatch(setPage(currentPage));
    dispatch(fetchMovies());
  };

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
      <div className="container h-100">
        <h5
          className="text-white text-left ml-4"
          data-testid="total-results-id"
        >
          Total results {totalResults}
        </h5>
        <div className="row mt-2">
          {value?.map((movie: Movie) => (
            <div
              key={`movie-div-${movie.id}`}
              data-testid={`movie-id`}
              id={`movie-id-${movie.id}`}
            >
              <div className="card zoom mb-2 ml-5" key={`div-items${movie.id}`}>
                <img
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                      : noimg
                  }
                  className="card-img-top"
                  alt=""
                />
                <div className="card-header car-max-height">
                  <div className="row">
                    <div className="column card-col">
                      <span>
                        <FontAwesomeIcon
                          className="mr-1 color-cornflowerblue"
                          size="1x"
                          icon={faUsers}
                        />
                        {movie.vote_count}
                      </span>
                    </div>
                    <div className="column font-weight-bold card-col">
                      <span>{movie.title}</span>
                    </div>
                    <div className="column card-col">
                      <span>
                        <FontAwesomeIcon
                          className="mr-1 color-yellow"
                          size="1x"
                          icon={faStar}
                        />
                        {movie.vote_average}
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush card-lines-ul">
                  <li
                    className="list-group-item"
                    key={`releasedate${movie.id}`}
                  >
                    <div className="row">
                      <div className="column card-col-description">
                        Release date
                      </div>
                      <div className="column card-col-description">
                        {movie.release_date}
                      </div>
                    </div>
                  </li>
                  <li
                    className="list-group-item"
                    key={`releasedatevalue${movie.id}`}
                  >
                    <div className="row">
                      <div className="column card-col-description">
                        Original language
                      </div>
                      <div className="column card-col-description text-uppercase">
                        {movie.original_language}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item" key={`popularity${movie.id}`}>
                    <div className="row">
                      <div className="column card-col-description">
                        Popularity
                      </div>
                      <div className="column card-col-description">
                        {movie.popularity}
                      </div>
                    </div>
                  </li>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleClick(movie.id)}
                  >
                    See details
                  </button>
                </ul>
              </div>
            </div>
          ))}
        </div>
        {showPagination && (
          <Pagination
            current={page}
            total={totalResults}
            pageSize={20}
            onChange={goToPage}
          />
        )}
      </div>
    </>
  );
};

export default Movies;
