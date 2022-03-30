import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

//Styles
import styles from './JobTemplate.module.scss';

//Components
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';

//Assets

const JobsTemplate = ({
  JobTitle,
  SpecificationList1 = [],
  SpecificationList2 = [],
  RequirementsList = [],
  Image,
  Description,
  TasksList = {},
  YourBenefitsList = {},
  ProfileList = {},
}) => {
  const router = useRouter();
  return (
    <>
      <ButtonUp />

      <div className={styles.body__gridContainer}>
        {/* /////////////////////////
          //        Hero         //
          ///////////////////////// */}

        <main className={`${styles.hero} container`}>
          <h1 className={styles.hero__title}>{JobTitle}</h1>
          <div className={styles.hero__specifications}>
            <div className={styles.hero__specificationsList1}>
              {SpecificationList1.map((list, index) => (
                <ul key={index}>
                  <li>{`Localización: ${list.Location}`}</li>
                  <li>{`Fecha de publicación: ${list.PublishingDate}`}</li>
                  <li>{`Salario: ${list.Salary}`}</li>
                </ul>
              ))}
            </div>
            <div className={styles.hero__specificationsList2}>
              {SpecificationList2.map((list, index) => (
                <ul key={index}>
                  <li>{`Experiancia requerida: ${list.Experience}`}</li>
                  <li>{`Tipo de contrato: ${list.Contract}`}</li>
                </ul>
              ))}
            </div>
          </div>
        </main>

        <hr className={`${styles.empleo__hr} container`} />

        <section className={`${styles.content} container`}>
          {/* /////////////////////////
          //       Requisitos        //
          ///////////////////////// */}

          <section className={styles.requirements}>
            <div className={styles.requirements__list}>
              <h3>Requisitos</h3>
              <div>
                {RequirementsList.map((list, index) => (
                  <ul key={index}>
                    <li>{`Estudios mínimos: ${list.MinimumStudies}`}</li>
                    <li>{`Experiencia mínima: ${list.Experience}`}</li>
                    <li>{`Disponibilidad requerida: ${list.Availability}`}</li>
                    {list.Plus && <li>{list.Plus}</li>}
                  </ul>
                ))}
              </div>
            </div>
            <figure className={styles.requirements__image}>
              {Image && <img src={Image.src} alt='Imagen del empleo' />}
            </figure>
          </section>

          {/* /////////////////////////
          //      Descripción       //
          ///////////////////////// */}

          <section className={styles.description}>
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

        <section className={`${styles.apply} container`}>
          <h4>¡Envíanos tu currículum y aplica al puesto!</h4>

          <button
            onClick={() => {
              router.push(
                { pathname: '/contacto', query: { CV: true } },
                'contacto'
              );
            }}
            className='btn button--red'
          >
            Enviar CV
          </button>
        </section>
      </div>
    </>
  );
};

export default JobsTemplate;

//Cannot use isRequired because propTypes triger before
//data for props is fetched
JobsTemplate.propTypes = {
  JobTitle: PropTypes.string,
  SpecificationList1: PropTypes.array,
  SpecificationList2: PropTypes.array,
  RequirementsList: PropTypes.array,
  Image: PropTypes.node,
  Description: PropTypes.string,
  TasksList: PropTypes.object,
  YourBenefitsList: PropTypes.object,
  ProfileList: PropTypes.object,
};
