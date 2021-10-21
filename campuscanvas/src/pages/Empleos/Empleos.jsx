import React from 'react';
import { Link } from 'react-router-dom';
import './Empleos.scoped.scss';

//Assets

//Components
import TablaEmpleos from './TablaEmpleos';
import Layout from '../../components/Layout/Layout';

function Empleos() {
  return (
    <Layout>
      <div className='body__gridContainer'>
        <main>
          <div className='main__container container'>
            <h2>Trabaja con nosotros!</h2>
            <p className='main__subTitle'>
              Forma parte de nuestro increíble equipo. Aquí puedes encontrar los
              puestos que actualmente buscamos:
            </p>

            <TablaEmpleos />

            <section className='main__sendCV'>
              <h3>O toma la iniciativa y envíanos tu CV</h3>
              <Link to='/construccion' className='btn button--red'>
                Enviar mi CV
              </Link>
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Empleos;
