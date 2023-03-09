import styles from './CircularLoader.module.scss';

const CircularLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spiner} />
    </div>
  );
};

export default CircularLoader;
