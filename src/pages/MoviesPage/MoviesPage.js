import { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { useHistory, useLocation } from "react-router-dom";
import apiService from "../../servises/API";
import Searchbar from "../../components/Searchbar";
import MoviePreview from "../../components/MoviePreview";
import style from "./MoviesPage.module.css";

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [movies, setMovies] = useState([]);

  const page = new URLSearchParams(location.search).get("page") ?? 1;

  useEffect(() => {
    if (location.search === "") {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get("query");

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
      .catch((error) => {
        console.log(error);
      });
  }, [query, page]);
  const searchImages = (newSearch) => {
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

      <MoviePreview movies={movies} location={location} />

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
