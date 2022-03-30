import React from 'react';

//Styles
import styles from './PostTemplate.module.scss';

const PostTemplate = ({
  Author,
  Content = [],
  SmallImage,
  LargeImage,
  Title,
  PubDate,
}) => {
  return (
    <div className='Post container'>
      <picture className={styles.Post__image}>
        <source media='(max-width:480px)' srcSet={SmallImage} />
        {LargeImage && <img src={LargeImage.src} alt='Imagen del post' />}
      </picture>

      <span className={styles.Post__author}>
        {' '}
        <strong>Autor:</strong> {Author}{' '}
      </span>
      <br />
      <span className={styles.Post__PubDate}>
        <h6>Fecha de publicación: </h6> {PubDate}
      </span>

      <hr />

      <h2 className={styles.Post__title}>{Title}</h2>
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
