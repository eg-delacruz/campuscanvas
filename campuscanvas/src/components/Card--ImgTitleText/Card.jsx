import React from 'react';

//styles
import './Card.scoped.scss';

function Card(props) {
  console.log(props);
  return (
    <article className='card'>
      <img className='card__image' src={props.image} alt={props.imgAlt} />
      <h4 className='card__title'>{props.title}</h4>
      <p className='card__description'>{props.children}</p>
    </article>
  );
}

export default Card;
