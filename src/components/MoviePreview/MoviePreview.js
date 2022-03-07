import style from "./MoviePreview.module.css";
import { NavLink } from "react-router-dom";

export default function MoviePreview({ movies, location }) {
  return (
    <ul className={style.moviesList}>
      {movies.map((movie) => (
        <li key={movie.id} className={style.moviesItem}>
          <NavLink
            to={{
              pathname: `movies/${movie.id}`,
              state: { from: { location } },
            }}
            className={style.link}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://images.creativemarket.com/0.1.0/ps/7414066/1820/1214/m1/fpnw/wm1/logo-design-for-movie-production-company-01-.jpg?1575502358&s=c37b3e6a8863b415070b669f6c8a457c"
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
                borderColor: movie.vote_average > 6 ? "#008000" : "	#FF8C00",
              }}
            >
              <span className={style.ratingText}>{movie.vote_average}</span>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
