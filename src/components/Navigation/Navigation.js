import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

export default function Navigation() {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <a href="/" className={style.logo}>
          Filmoteka
        </a>
        <div>
          <NavLink
            exact
            to="/"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Movies
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
