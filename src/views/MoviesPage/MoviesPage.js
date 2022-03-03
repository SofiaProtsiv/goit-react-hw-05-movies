import apiService from '../../servises/API';
import style from './MoviesPage.module.css';
import Searchbar from '../../components/Searchbar';
import { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import {
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [movies, setMovies] = useState([]);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get('query');

    setQuery(newSearch, page);
  }, [location.search, page]);

  useEffect(() => {
    if (!query) return;
    apiService
      .getMoviesByKeyWord(query, page)
      .then(({ results, total_pages }) => {
        if (results.length === 0) {
          return;
        }

        setMovies(results);
        setTotalPage(total_pages);
      })
      .catch(error => {
        console.log(error);
      });
  }, [query, page]);
  const searchImages = newSearch => {
    if (query === newSearch) return;
    setQuery(newSearch);
    setMovies([]);

    history.push({ ...location, search: `query=${newSearch}&page=1` });
  };

  const onHandlePage = (event, page) => {
    history.push({ ...location, search: `query=${query}&page=${page}` });
  };

  return (
    <>
      <Searchbar onHandleSubmit={searchImages} />

      <ul className={style.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={style.moviesItem}>
            <NavLink to={`${url}/${movie.id}`} className={style.link}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://images.creativemarket.com/0.1.0/ps/7414066/1820/1214/m1/fpnw/wm1/logo-design-for-movie-production-company-01-.jpg?1575502358&s=c37b3e6a8863b415070b669f6c8a457c'
                }
                alt={movie.title}
                width="320"
                className={style.poster}
              />
              <div
                className={style.rating}
                style={{
                  borderColor: movie.vote_average > 6 ? '#008000' : '	#FF8C00',
                }}
              >
                <span className={style.ratingText}>{movie.vote_average}</span>
              </div>
              <p className={style.movieTitle}>{movie.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
      {totalPage > 1 && (
        <Pagination
          className={style.pagination}
          count={totalPage}
          onChange={onHandlePage}
          page={Number(page)}
          showFirstButton
          showLastButton
          size="large"
        />
      )}
    </>
  );
}
