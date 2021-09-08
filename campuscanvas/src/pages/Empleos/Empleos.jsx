import React from 'react';
import { Link } from 'react-router-dom';
import './Empleos.scoped.scss';

function Empleos() {
  return (
    <div className='body__gridContainer'>
      <main>
        <div className='main__container container'>
          <h2>Trabaja con nosotros!</h2>
          <p className='main__subTitle'>
            Forma parte de nuestro increíble equipo. Aquí puedes encontrar los
            puestos que actualmente buscamos:
          </p>

          <section className='main__jobs'>
            <article className='main__jobCard'>
              <h4 className='main_jobCardTitle'>
                Desarrollador frontend con React
              </h4>
              <p>
                Aquí va una pequeña descripción del perfil que estamos buscando.
                Se describen un poco las habilidades requeridas de una manera
                interesante y corta. Pueden mencionarse las tecnologías que el
                solicitante deberá dominar de manera rápida. Quizá poner algunas
                actividades extra que se llevarán a cabo con otros equipos o el
                propósito de lo que se quiere lograr con este cargo.
              </p>
              <Link className='btn button--purple' to='/construccion'>
                Más información
              </Link>
            </article>
            <article className='main__jobCard'>
              <h4>Desarrollador frontend con React</h4>
              <p>
                Aquí va una pequeña descripción del perfil que estamos buscando.
                Se describen un poco las habilidades requeridas de una manera
                interesante y corta. Pueden mencionarse las tecnologías que el
                solicitante deberá dominar de manera rápida. Quizá poner algunas
                actividades extra que se llevarán a cabo con otros equipos o el
                propósito de lo que se quiere lograr con este cargo.
              </p>
              <Link className='btn button--purple' to='/construccion'>
                Más información
              </Link>
            </article>
            <article className='main__jobCard'>
              <h4>Desarrollador frontend con React</h4>
              <p>
                Aquí va una pequeña descripción del perfil que estamos buscando.
                Se describen un poco las habilidades requeridas de una manera
                interesante y corta. Pueden mencionarse las tecnologías que el
                solicitante deberá dominar de manera rápida. Quizá poner algunas
                actividades extra que se llevarán a cabo con otros equipos o el
                propósito de lo que se quiere lograr con este cargo.
              </p>
              <Link className='btn button--purple' to='/construccion'>
                Más información
              </Link>
            </article>
          </section>

          <section className='main__sendCV'>
            <h3>O toma la iniciativa y envíanos tu CV</h3>
            <Link to='/construccion' className='btn button-red'>
              Enviar mi CV
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Empleos;
