import React from 'react';

//Styles
import './PostTemplate.scoped.scss';

const PostTemplate = ({ Author, Content = [], Image, Title, PubDate }) => {
  return (
    <div className='Post container'>
      <figure className='Post__image'>
        <img src={Image} alt='Imagen del post' />
      </figure>

      <span className='Post__author'>
        {' '}
        <strong>Autor:</strong> {Author}{' '}
      </span>
      <br />
      <span className='Post__PubDate'>
        <h6>Fecha de publicación: </h6> {PubDate}
      </span>

      <hr />

      <h2 className='Post__title'>{Title}</h2>
      {Content.map((paragraph, index) => (
        <div key={index}>
          <p>{paragraph}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default PostTemplate;
