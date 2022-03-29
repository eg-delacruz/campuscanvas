import React from 'react';
import PropTypes from 'prop-types';

//styles
import styles from './Card.module.scss';

function Card({ image, imgAlt, title, children }) {
  return (
    <article className={styles.card}>
      <img className={styles.card__image} src={image.src} alt={imgAlt} />
      <h4 className={styles.card__title}>{title}</h4>
      <p className={styles.card__description}>{children}</p>
    </article>
  );
}

export default Card;

Card.propTypes = {
  image: PropTypes.node.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
