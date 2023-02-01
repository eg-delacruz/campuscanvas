import styles from './WarningImage.module.scss';

//Color can ba yellow or red
const WarningImage = ({ color = 'yellow' }) => {
  return (
    <div
      className={`${styles.container} ${
        color === 'yellow' ? styles.yellow : color === 'red' ? styles.red : ''
      }`}
    >
      <span
        className={`${
          color === 'yellow' ? styles.yellow : color === 'red' ? styles.red : ''
        }`}
      >
        !
      </span>
    </div>
  );
};

export default WarningImage;
