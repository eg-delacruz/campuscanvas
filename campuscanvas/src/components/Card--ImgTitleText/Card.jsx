import React from 'react';

//styles
import './Card.scoped.scss';

function Card(props) {
  console.log(props);
  return (
    <article className='card'>
      <img src={props.image} alt={props.imgAlt} />
      <h4>{props.title}</h4>
      <p>{props.children}</p>
    </article>
  );
}

export default Card;
