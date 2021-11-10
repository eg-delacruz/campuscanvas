import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import './Empleos.scoped.scss';

//Components
import HelmetLayout from '../../components/GeneralUseComponents/HelmetLayout/HelmetLayout';
import TablaEmpleos from '../../components/UsedInSpecificRoutes/Jobs/TablaEmpleos/TablaEmpleos';
import Layout from '../../components/GeneralUseComponents/Layout/Layout';

function Empleos() {
  return (
    <Layout>
      <HelmetLayout
        title='Empleos'
        subtitle='Aplica a un empleo en Campus Canvas'
      />
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
              <h3>Toma la iniciativa y envíanos tu CV</h3>
              <Link
                to={{ pathname: '/contacto', state: { CV: true } }}
                className='btn button--red'
              >
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
