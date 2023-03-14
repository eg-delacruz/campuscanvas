import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

//styles
import styles from './ButtonBack.module.scss';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

const ButtonBack = ({ prevRoute }) => {
  return (
    <Link href={prevRoute}>
      <button type='button' className={`${styles.button_back} btn button--red`}>
        <span>
          <Image src={arrow_right_white} />
        </span>
        <div>Atrás</div>
      </button>
    </Link>
  );
};

export default ButtonBack;

ButtonBack.propTypes = {
  prevRoute: PropTypes.string.isRequired,
};
