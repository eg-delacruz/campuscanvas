import Image from 'next/image';

//Styles
import styles from './AnimatedBox.module.scss';

//Assets
import box_back from '@assets/GeneralUse/AnimatedBoxElements/box_back.svg';
import products from '@assets/GeneralUse/AnimatedBoxElements/products.svg';
import box_front from '@assets/GeneralUse/AnimatedBoxElements/box_front.svg';

//Components

//NOTE: Component ment to be used in home hero, not sure if it will work somewhere else
const AnimatedBox = () => {
  return (
    <div className={styles.box_container}>
      <div className={styles.box_back}>
        <img src={box_back.src} />
      </div>
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
