import React from 'react';

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
