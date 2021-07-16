import React from 'react';

//assets
import './Nosotros.scoped.scss';
import nosotrosImage from '../../assets/static/sample_image_nosotros.jpg';

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nisl eros, pulvinar facilisis justo mollis, auctor consequat
                urna. Morbi a bibendum metus. Donec scelerisque sollicitudin
                enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci
                vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Duis pharetra luctus
                lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere
                ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper
                sagittis id vel leo. Integer feugiat faucibus libero, at maximus
                nisl suscipit posuere. Morbi nec enim nunc. Phasellus bibendum
                turpis ut ipsum egestas, sed sollicitudin elit{' '}
              </p>
              <figure>
                <img src={nosotrosImage} alt='Equipo Campus Canvas' />
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
