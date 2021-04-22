import React from 'react';
import './Main.scss';

//Componentes
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Main() {
  return (
    <div className='body__gridContainer'>
      <Header />
      <h1>Hola</h1>
      <Footer />
    </div>
  );
}

export default Main;
