import { lazy, useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Container from './components/Container';
import { ToastContainer } from 'react-toastify';
import LoaderComponent from './components/Loader';

const HomePage = lazy(() =>
  import('./views/Home' /* webpackChunkName: "Home" */),
);

const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage' /* webpackChunkName: "Movie-details-page"*/
  ),
);

export default function App() {
  return (
    <>
      <Navigation />
      <Container>
        <Suspense fallback={<LoaderComponent />}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/movies" exact>
              <MoviesPage />
            </Route>

            <Route path="/movies/:movieID">
              <MovieDetailsPage />
            </Route>
          </Switch>
        </Suspense>
        <ToastContainer />
      </Container>
    </>
  );
}
