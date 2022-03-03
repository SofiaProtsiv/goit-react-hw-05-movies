import { ImSpinner } from 'react-icons/im';
import style from './Loader.module.css';

const styles = {
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    fontSize: 28,
  },
};

export default function LoaderComponent() {
  return (
    <div role="alert">
      <div style={styles.spinner}>
        <ImSpinner size="32" className={style.spinner} />
      </div>
    </div>
  );
}
