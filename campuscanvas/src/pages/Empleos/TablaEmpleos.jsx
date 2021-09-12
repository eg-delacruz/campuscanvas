import React from 'react';
import { Link } from 'react-router-dom';
import './Empleos.scoped.scss';

function TablaEmpleos() {
  const OFERTAS = [
    {
      id: 1,
      title: 'Desarrollador frontend con React',
      content:
        'Aquí va una pequeña descripción del perfil que estamos buscando. Se describen un poco las habilidades requeridas de una manera interesante y corta. Pueden mencionarse las tecnologías que el solicitante deberá dominar de manera rápida. Quizá poner algunas actividades extra que se llevarán a cabo con otros equipos o el propósito de lo que se quiere lograr con este cargo.',
    },
    {
      id: 2,
      title: 'Desarrollador frontend con React',
      content:
        'Aquí va una pequeña descripción del perfil que estamos buscando. Se describen un poco las habilidades requeridas de una manera interesante y corta. Pueden mencionarse las tecnologías que el solicitante deberá dominar de manera rápida. Quizá poner algunas actividades extra que se llevarán a cabo con otros equipos o el propósito de lo que se quiere lograr con este cargo.',
    },
    {
      id: 3,
      title: 'Desarrollador frontend con React',
      content:
        'Aquí va una pequeña descripción del perfil que estamos buscando. Se describen un poco las habilidades requeridas de una manera interesante y corta. Pueden mencionarse las tecnologías que el solicitante deberá dominar de manera rápida. Quizá poner algunas actividades extra que se llevarán a cabo con otros equipos o el propósito de lo que se quiere lograr con este cargo.',
    },
  ];

  const displayOffers = () =>
    OFERTAS.map((oferta) => (
      <article key={oferta.id} className='main__jobCard'>
        <h4 className='main_jobCardTitle'>{oferta.title}</h4>
        <p>{oferta.content}</p>
        <Link className='btn button--purple' to='/construccion'>
          Más información
        </Link>
      </article>
    ));

  return (
    <React.Fragment>
      <section className='main__jobs'>{displayOffers()}</section>
    </React.Fragment>
  );
}

export default TablaEmpleos;
