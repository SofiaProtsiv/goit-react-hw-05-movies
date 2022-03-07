import style from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.footer_text}>
        &copy; 2022 |
        <span className={style.current_rights}> All Rights Reserved</span>
      </p>
    </footer>
  );
}
