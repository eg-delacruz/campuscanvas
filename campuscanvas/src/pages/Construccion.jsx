import React from 'react';

function Construccion() {
  return (
    <React.Fragment>
      <header className='header'>
        <div className='header__container container'>
          <a href='/'>
            <img src='../assets/images/logo.svg' alt='Logo Campus Canvas' />
          </a>
        </div>
      </header>
      <main className='main'>
        <div className='main__container container'>
          <h2>Esta parte de nuestro sitio está en desarrollo</h2>
          <figure>
            <img
              src='../assets/images/under_construction.svg'
              alt='Sitio en construcción'
            />
          </figure>
          <p>
            Estamos preparando funcionalidades muy especiales para ti. <br />
            Siempre puedes volver al <a href='/'>Home</a>
          </p>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Construccion;
