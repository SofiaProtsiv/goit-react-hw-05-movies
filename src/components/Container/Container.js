import style from "./Container.module.css";

export default function Container({ children }) {
  return (
    <section className={style.section}>
      <div className={style.container}>{children}</div>
    </section>
  );
}
