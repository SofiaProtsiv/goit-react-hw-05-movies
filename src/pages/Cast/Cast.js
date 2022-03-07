import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../servises/API";
import style from "./Cast.module.css";

export default function Cast() {
  const [cast, setCast] = useState([]);
  const [loadMoreBtn, setLoadMore] = useState(true);
  const { movieID } = useParams();

  useEffect(() => {
    apiService
      .getCastInfo(movieID)
      .then((info) => {
        setCast(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  const loadMore = () => {
    setLoadMore((show) => !show);
  };
  return (
    <ul className={loadMoreBtn ? `${style.cast}` : `${style.castActive}`}>
      {cast.map((actor) => (
        <li key={actor.id} className={style.castItem}>
          <div className={style.overlay}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "https://www.maxpixel.net/static/photo/1x/Person-User-Icon-About-Me-Personal-Preference-2517433.png"
              }
              alt={actor.original_name}
              className={style.castImg}
            />
            <div className={style.info}>
              <h4 className={style.name}>{actor.original_name}</h4>
              <p className={style.character}>{actor.character}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
