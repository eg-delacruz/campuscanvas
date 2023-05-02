import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

//styles
import styles from './ButtonBack.module.scss';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

const ButtonBack = ({ prevRoute, message = 'Atrás', disabled = false }) => {
  return (
    <Link
      className={`${disabled ? styles.link_disabled : ''}`}
      href={prevRoute}
    >
      <button
        disabled={disabled}
        type='button'
        className={`${styles.button_back} ${
          disabled ? styles.btn_disabled : ''
        } btn button--red`}
      >
        <span>
          <Image src={arrow_right_white} />
        </span>
        <div>{message}</div>
      </button>
    </Link>
  );
};

export default ButtonBack;

ButtonBack.propTypes = {
  prevRoute: PropTypes.string.isRequired,
  message: PropTypes.string,
  disabled: PropTypes.bool,
};
