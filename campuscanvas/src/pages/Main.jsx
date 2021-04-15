import React from 'react';
import '../assets/styles/pages/Main.scss';

//Componentes
import Header from '../components/Header';
import Footer from '../components/Footer';

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
