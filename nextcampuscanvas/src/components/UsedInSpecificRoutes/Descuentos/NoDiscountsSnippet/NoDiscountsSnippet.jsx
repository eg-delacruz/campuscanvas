import PropTypes from 'prop-types';
import Image from 'next/image';

//Styles
import styles from './NoDiscountsSnippet.module.scss';

//Assets
import no_discounts_sad_face_img from '@assets/GeneralUse/no_discounts_sad_face_img.svg';

const NoDiscountsSnippet = ({ brand_URL, brand_name }) => {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <Image src={no_discounts_sad_face_img} alt='No hay descuentos' />
      </div>
      <h4>{brand_name} no tiene descuentos actualmente</h4>
      <p>Siempre puedes visitar y explorar su web</p>
      <a
        target='_blank'
        className={`${styles.website_btn} btn button--red`}
        href={brand_URL}
      >
        Visitar la web de {brand_name}
      </a>
    </div>
  );
};

export default NoDiscountsSnippet;

NoDiscountsSnippet.propTypes = {
  brand_URL: PropTypes.string.isRequired,
  brand_name: PropTypes.string.isRequired,
};
