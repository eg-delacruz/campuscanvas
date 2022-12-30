//Styles
import styles from './HomeSlider.module.scss';

const HomeSlider = () => {
  //TODO: Slider must get info either SSR or from database in client
  return (
    <section className={`${styles.slider} container`}>
      <h2>Slider placeholder</h2>
    </section>
  );
};

export default HomeSlider;
