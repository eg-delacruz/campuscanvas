import React from 'react';

//assets
import './Nosotros.scoped.scss';
import Gerardo from '../../assets/static/Gerardo.jpg';

//Components

function Nosotros() {
  return (
    <div>
      {/* /////////////////////////
            //       Hero        //
            ///////////////////////// */}

      <section className='hero'>
        <div className='hero__container container'>
          <h1>Unimos estudiantes y empresas de una manera diferente</h1>
        </div>
      </section>

      {/* /////////////////////////
            //       Main        //
            ///////////////////////// */}

      <main className='main'>
        <div className='main__container container'>
          <div className='main__quienesSomos'>
            <h2>¿Quiénes somos?</h2>
            <div className='main__quienesSomos-container'>
              <p>
                El principal promotor de Campus Canvas es Gerardo De La Cruz,
                graduado en 2021 en la Universidad de Ciencias Aplicadas de
                Bremen con un Grado Internacional en Ingeniería Económica. El
                carácter internacional de sus estudios le ha permitido indagar
                en los ámbitos comerciales y aspectos empresariales de distintos
                países, principalmente de Alemania, España y El Salvador. <br />
                <br /> La experiencia adquirida en empresas de renombre como
                Bosch, en Madrid, o Aeroman, en El Salvador, en combinación con
                sus estudios enfocados a las distintas áreas empresariales
                (mercadeo, contabilidad, recursos humanos, financiación) y el
                desarrollo de destrezas interpersonales en entornos
                multiculturales ha culminado en la creación de este proyecto
                Campus Canvas.
              </p>
              <figure className='main__image1Container'>
                <img
                  className='main__image1'
                  src={Gerardo}
                  alt='Equipo Campus Canvas'
                />
              </figure>
            </div>
          </div>

          <div className='main__motivation'>
            <h2>Lo que nos motiva</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Nosotros;
