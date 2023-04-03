import styles from './BurgerButton.module.scss';

const BurgerButton = () => {
  return (
    <i className={styles['burguer__button']} id='burger-menu'>
      <div className={styles['icon__line']} />
      <div className={`${styles['burguer__line2']} ${styles['icon__line']}`} />
      <div className={styles['icon__line']} />
    </i>
  );
};

export default BurgerButton;
