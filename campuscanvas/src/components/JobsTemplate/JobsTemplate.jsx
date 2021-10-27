import React from 'react';

//Styles
import './JobsTemplate.scoped.scss';

//Components
import Layout from '../Layout/Layout';

const JobsTemplate = ({
  JobTitle = 'Colaborador en tareas logísticas y de distribución',
  SpecificationList1 = [
    {
      Localización: 'Ciudad Universitaria',
      Publicación: '26/10/2021',
      Salario: '25 000 EUR',
    },
  ],
  SpecificationList2 = [],
}) => {
  return (
    <Layout>
      <div className='body__gridContainer'>
        <h1>{JobTitle}</h1>
      </div>
    </Layout>
  );
};

export default JobsTemplate;

//No olvidar proptypes
