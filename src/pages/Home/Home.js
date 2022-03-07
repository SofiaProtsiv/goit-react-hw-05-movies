import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import MoviePreview from "../../components/MoviePreview";
import apiService from "../../servises/API";
import style from "./HomePage.module.css";
import Footer from "../../components/Footer";
import Container from "../../components/Container";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const page = new URLSearchParams(location.search).get("page") ?? 1;

  useEffect(() => {
    apiService
      .getPopularMovies(page)
      .then(({ results, total_pages }) => {
        setMovies(results);
        setTotalPage(total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const onHandlePage = (page) => {
    history.push({ ...location, search: `page=${page}` });
  };

  return (
    <>
      <Container>
        <main className={style.main}>
          <h1 className={style.title}>Popular movies</h1>

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
        </main>
      </Container>

      <Footer />
    </>
  );
}
