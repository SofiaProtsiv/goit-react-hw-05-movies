import style from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({ onHandleSubmit }) {
  const [query, setQuery] = useState('');

  const handleChangeQuery = event => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.info('Please enter your query!');
      return;
    }
    onHandleSubmit(query);
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Enter movie name..."
          onChange={handleChangeQuery}
          className={style.input}
        />
        <button type="submit" className={style.button}>
          Search
        </button>
        <button type="submit" className={style.searchBtn}>
          🔎
        </button>
      </form>
    </>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
