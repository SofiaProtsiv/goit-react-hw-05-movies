import { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../servises/API";
import MovieInfo from "../../components/MovieInfo";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  let { movieID } = useParams();

  useEffect(() => {
    apiService
      .getMovieById(movieID)
      .then((info) => {
        setMovie(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  return <MovieInfo movie={movie} />;
}
