import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../servises/API';
import style from './Reviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { movieID } = useParams();

  useEffect(() => {
    apiService
      .getMovieReview(movieID)
      .then(results => {
        if (results.length === 0) {
          return;
        }
        setReviews(results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieID]);

  return (
    <>
      <ul className={style.review}>
        {reviews.map(review => (
          <li key={review.id} className={style.item}>
            <h2 className={style.author}>{review.author}</h2>
            <p>{review.content}</p>
          </li>
        ))}

        {reviews.length < 1 && <p className={style.author}>Any rewiews</p>}
      </ul>
    </>
  );
}
