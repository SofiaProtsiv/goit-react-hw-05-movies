import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import style from "./MovieDetailsPage.module.css";
import LoaderComponent from "../Loader";

const Cast = lazy(() =>
  import("../../pages/Cast" /* webpackChunkName: "cast"*/)
);
const Reviews = lazy(() =>
  import("../../pages/Reviews" /* webpackChunkName: "reviews"*/)
);

export default function MovieInfo({ movie }) {
  const history = useHistory();
  const match = useRouteMatch();
  const [back, setBack] = useState();
  const backDate = history.location.state;

  useEffect(() => {
    backDate && setBack(backDate);
  }, [backDate]);

  const GoBack = () => {
    history.push(back?.from.location);
  };

  return (
    <>
      <button onClick={GoBack} type="button" className={style.button}>
        <span>Go back</span>
      </button>

      <div className={style.movies}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "https://images.creativemarket.com/0.1.0/ps/7414066/1820/1214/m1/fpnw/wm1/logo-design-for-movie-production-company-01-.jpg?1575502358&s=c37b3e6a8863b415070b669f6c8a457c"
          }
          alt={movie.title}
          width="250"
        />
        <div className={style.about}>
          <h2 className={style.mainTitle}>{movie.title} </h2>
          <p className={style.score}>User Score: {movie.vote_average * 10}%</p>
          <p className={style.tagline}>{movie.tagline}</p>

          <h3 className={style.title}>
            Overview
            <span className={style.description}>{movie.overview}</span>
          </h3>
          {movie.genres && (
            <>
              <h3 className={style.title}>Genres</h3>
              <ul className={style.genre}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <nav className={style.navigation}>
        <p className={style.information}>Additional information</p>

        <NavLink
          to={{
            pathname: `${match.url}/cast`,
          }}
          className={style.link}
          activeClassName={style.activeLink}
        >
          Cast
        </NavLink>

        <NavLink
          to={{
            pathname: `${match.url}/reviews`,
          }}
          className={style.link}
          activeClassName={style.activeLink}
        >
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback={<LoaderComponent />}>
        <Switch>
          <Route
            path={`${match.path}/cast`}
            render={(props) => <Cast {...props} />}
          />
          <Route
            path={`${match.path}/reviews`}
            render={(props) => <Reviews {...props} />}
          />
        </Switch>
      </Suspense>
    </>
  );
}
