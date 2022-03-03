import apiService from '../../servises/API';
import style from './HomePage.module.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    apiService
      .getPopularMovies(page)
      .then(({ results, total_pages }) => {
        setMovies(results);
        setTotalPage(total_pages);
      })
      .catch(error => {
        console.log(error);
      });
  }, [page]);

  const onHandlePage = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };

  return (
    <main className={style.main}>
      <h1 className={style.title}>Trending today</h1>
      <>
        <ul className={style.moviesList}>
          {movies.map(movie => (
            <li key={movie.id} className={style.moviesItem}>
              <Link to={`movies/${movie.id}`} className={style.link}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : 'https://images.creativemarket.com/0.1.0/ps/7414066/1820/1214/m1/fpnw/wm1/logo-design-for-movie-production-company-01-.jpg?1575502358&s=c37b3e6a8863b415070b669f6c8a457c'
                  }
                  alt={movie.title}
                  width="100%"
                  height="100%"
                  className={style.poster}
                />
                <span className={style.movieTitle}>{movie.title}</span>
                <div
                  className={style.rating}
                  style={{
                    borderColor: movie.vote_average > 6 ? '#008000' : '	#FF8C00',
                  }}
                >
                  <span className={style.ratingText}>{movie.vote_average}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </>
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
    </main>
  );
}
