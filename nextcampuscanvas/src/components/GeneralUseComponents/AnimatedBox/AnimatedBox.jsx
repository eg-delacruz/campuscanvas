import Image from 'next/image';

//Styles
import styles from './AnimatedBox.module.scss';

//Assets
import box_back from '@assets/GeneralUse/AnimatedBoxElements/box_back.svg';
import products from '@assets/GeneralUse/AnimatedBoxElements/products.svg';
import box_front from '@assets/GeneralUse/AnimatedBoxElements/box_front.svg';
import star from '@assets/GeneralUse/AnimatedBoxElements/star.svg';

//Components

//NOTE: Component ment to be used in home hero, not sure if it will work somewhere else
const AnimatedBox = () => {
  return (
    <div className={styles.box_container}>
      <div className={styles.box_back}>
        <img src={box_back.src} />
      </div>

      {/* /////////////////////////
        //         Stars         //
        ///////////////////////// */}
      <div className={styles.stars_container}>
        <div className={`${styles.star_small} ${styles.star1}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star2}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star3}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star4}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star5}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star6}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star7}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star8}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star9}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star10}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star11}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star12}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star13}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star14}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star15}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star16}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star17}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star18}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star19}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star20}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star21}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star22}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_small} ${styles.star23}`}>
          <img src={star.src} />
        </div>
        <div className={`${styles.star_big} ${styles.star24}`}>
          <img src={star.src} />
        </div>
      </div>

      {/* /////////////////////////
        //  Products and front  //
        ///////////////////////// */}
      <div className={styles.products}>
        <img src={products.src} />
      </div>
      <div className={styles.box_front}>
        <img src={box_front.src} />
      </div>
    </div>
  );
};

export default AnimatedBox;
