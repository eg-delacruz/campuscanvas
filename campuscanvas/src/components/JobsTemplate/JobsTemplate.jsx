import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import './JobsTemplate.scoped.scss';

//Components
import Layout from '../Layout/Layout';
import ButtonUp from '../ButtonUp/ButtonUp';

//Assets
import LogisticsImage from '../../assets/static/logistics_image.jpg';

const JobsTemplate = ({
  //Default values of Job Template
  JobTitle = 'Colaborador en tareas logísticas y de distribución',
  SpecificationList1 = [
    {
      Location: 'Ciudad Universitaria',
      PublishingDate: '26/10/2021',
      Salary: '25 000 EUR',
    },
  ],
  SpecificationList2 = [
    {
      Experience: '2 años',
      Contract: 'Temporal',
    },
  ],
  RequirementsList = [
    {
      MinimumStudies: 'Escuela Primaria Obligatoria (ESO)',
      Experience: '2 Años',
      Availability: '8 horas diarias',
    },
  ],
  Image = LogisticsImage,
  Description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, pe.',
  //Nótese que TaskList es un objeto, NO UN ARRAY, para poder pasar tasks indefinidos.
  TasksList = {
    Task1: 'Ayuda en la repartición de bolsas en puntos de distribución.',
    Task2: 'Apoyo en la recolección de bienes para su posterior distribución.',
    Task3:
      'Conducción de furgoneta para recogida y posterior distribución de materiales.',
    Task4: 'Preparación de bolsas de repartición en almacén.',
    Task5: 'Promoción de servicios',
    Task6: 'Orientación de estudiantes en puntos de repartición.',
  },
  //Nótese que YourBenefitsList es un objeto, NO UN ARRAY, para poder pasar benefits indefinidos.
  YourBenefitsList = {
    Benefit1:
      'Ambiente agradable en una empresa joven y de rápido crecimiento.',
    Benefit2:
      'Promovemos una cultura sana y de apoyo mutuo dentro de nuestro equipo, sin dejar lugar a la discriminación por apariencia física, creencias, género, orientación sexual, etc.',
    Benefit3:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
    Benefit4:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
    Benefit5:
      'PClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
    Benefit6:
      'OriClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
  },
  //Nótese que ProfileList es un objeto, NO UN ARRAY, para poder pasar características indefinidos.
  ProfileList = {
    Attribute1: 'Edad: 18 - 50 años',
    Attribute2: 'Conocimientos en word, excel, PowerPoint.',
    Attribute3:
      'Habilidades blandas: organización, planificación, habilidad excepcional para comunicar, capacidad de resolución de problemas por sí solo o en equipo.',
  },
}) => {
  return (
    <Layout>
      <ButtonUp />

      <div className='body__gridContainer'>
        {/* /////////////////////////
          //        Hero         //
          ///////////////////////// */}

        <main className='hero container'>
          <h1 className='hero__title'>{JobTitle}</h1>
          <div className='hero__specifications'>
            <div className='hero__specificationsList1'>
              {SpecificationList1.map((list, index) => (
                <ul key={index}>
                  <li>{`Localización: ${list.Location}`}</li>
                  <li>{`Fecha de publicación: ${list.PublishingDate}`}</li>
                  <li>{`Salario: ${list.Salary}`}</li>
                </ul>
              ))}
            </div>
            <div className='hero__specificationsList2'>
              {SpecificationList2.map((list, index) => (
                <ul key={index}>
                  <li>{`Experiancia requerida: ${list.Experience}`}</li>
                  <li>{`Tipo de contrato: ${list.Contract}`}</li>
                </ul>
              ))}
            </div>
          </div>
        </main>

        <hr className='empleo__hr container' />

        <section className='content container'>
          {/* /////////////////////////
          //       Requisitos        //
          ///////////////////////// */}

          <section className='requirements'>
            <div className='requirements__list'>
              <h3>Requisitos</h3>
              <div>
                {RequirementsList.map((list, index) => (
                  <ul key={index}>
                    <li>{`Estudios mínimos: ${list.MinimumStudies}`}</li>
                    <li>{`Experiencia mínima: ${list.Experience}`}</li>
                    <li>{`Disponibilidad requerida: ${list.Availability}`}</li>
                  </ul>
                ))}
              </div>
            </div>
            <figure className='requirements__image'>
              <img src={Image} alt='Imagen del empleo' />
            </figure>
          </section>

          {/* /////////////////////////
          //      Descripción       //
          ///////////////////////// */}

          <section className='description'>
            <h3>Descripción</h3>
            <p>{Description}</p>
            <h4>Tareas a realizar</h4>
            <ul>
              {Object.entries(TasksList).map(([key, value]) => {
                return <li key={key.toString()}>{value}</li>;
              })}
            </ul>

            <h4>Lo que ofrecemos</h4>
            <ul>
              {Object.entries(YourBenefitsList).map(([key, value]) => {
                return <li key={key.toString()}>{value}</li>;
              })}
            </ul>
          </section>

          {/* /////////////////////////
          //         Perfil          //
          ///////////////////////// */}

          <section>
            <h3>Perfil deseado</h3>
            <ul>
              {Object.entries(ProfileList).map(([key, value]) => {
                return <li key={key.toString()}>{value}</li>;
              })}
            </ul>
          </section>
        </section>

        {/* /////////////////////////
          //   Enviar currículum     //
          ///////////////////////// */}

        <section className='apply container'>
          <h4>¡Envíanos tu currículum y aplica al puesto!</h4>
          <Link to='/contacto' className='btn button--red'>
            Enviar mi CV
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default JobsTemplate;

//No olvidar proptypes
