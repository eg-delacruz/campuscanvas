import React from 'react';
import PropTypes from 'prop-types';

//styles
import './Card.scoped.scss';

function Card({ image, imgAlt, title, children }) {
  return (
    <article className='card'>
      <img className='card__image' src={image} alt={imgAlt} />
      <h4 className='card__title'>{title}</h4>
      <p className='card__description'>{children}</p>
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
