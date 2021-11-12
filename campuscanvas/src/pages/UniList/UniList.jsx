import React from 'react';

//Styles
import './UniList.scoped.scss';

//Components
import Layout from '../../components/GeneralUseComponents/Layout/Layout';
import HelmetLayout from '../../components/GeneralUseComponents/HelmetLayout/HelmetLayout';

const UniList = () => {
  return (
    <Layout>
      <HelmetLayout
        title='Universidades'
        subtitle='Lista de universidades y ubicaciones de repartición'
      />
      <div className='Universidades container'>
        <h1>Lista de universidades</h1>
        <h3>Próximamente actualizaremos nuestra lista de repartición.</h3>

        <table className='UniList'>
          <thead>
            <tr>
              <th>Lista de Universidades</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className='Uni'>Universidad Rey Juan Carlos URJC</td>
            </tr>
            <tr>
              <td className='Campus'>Campus Alcorcón</td>
            </tr>
            <tr>
              <td className='Campus'>Campus Aranjuez</td>
            </tr>
            <tr>
              <td className='Campus'>Campus Fuenlabrada</td>
            </tr>
            <tr>
              <td className='Campus'>Paseo de los artilleros</td>
            </tr>
            <tr>
              <td className='Uni'>Universidad Complutense de Madrid</td>
            </tr>
            <tr>
              <td className='Campus'>Campus Av. Séneca</td>
            </tr>
            <tr>
              <td className='Campus'>Campus de Somosaguas</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UniList;
