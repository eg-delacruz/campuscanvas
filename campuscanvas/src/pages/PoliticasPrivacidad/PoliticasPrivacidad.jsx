import React from 'react';
import './PoliticasPrivacidad.scoped.scss';

//Assets

//Components
import HelmetLayout from '../../components/GeneralUseComponents/HelmetLayout/HelmetLayout';
import ButtonUp from '../../components/GeneralUseComponents/ButtonUp/ButtonUp';
import Layout from '../../components/GeneralUseComponents/Layout/Layout';

function politicasPrivacidad() {
  return (
    <Layout>
      <HelmetLayout
        title='Privacidad'
        subtitle='Estas son nuestras políticas de privacidad'
      />
      <div className='body__gridContainer'>
        <section className='main'>
          <div className='main__container container'>
            <ButtonUp />
            <h2>Políticas de privacidad</h2>

            <article>
              <h3>Responsable del tratamiento de tus datos</h3>
              <h4>¿Quién es responsable de sus datos?</h4>
              <strong>Titular: </strong> Campus Canvas, S.L. <br /> <br />
              <strong>NIF: </strong> B09762238 <br /> <br />
              <strong>Domicilio social: </strong> Calle de Juan Montalvo 29,
              Madrid, España <br /> <br />
              <strong>Registro público: </strong> Inscrita en el registro
              mercantil de Madrid, tomo 42930, del archivo general del libro de
              sociedades, folio 193, hoja número M-758914
              <br /> <br />
              <strong>Teléfono de contacto: </strong> 611 516 396
              <br /> <br />
            </article>

            <article>
              <h4>¿Qué categorías de datos tratamos?</h4>
              <p>
                De momento, la web de Campus Canvas no recopila datos de ningún
                tipo, por consiguiente no se hace rastreo de "cookies" ni de
                ningún tipo de dato del usuario. Nuestra web se limita a ser
                meramente informativa a quien interese. Sin embargo, en futuras
                versiones y actualizaciones de esta, es posible que se
                implemente el uso de cookies para mejorar la usabilidad y los
                servicios que se vayan añadiendo. Estas actualizaciones e
                implementaciones serán notificadas en este apartado de nuestra
                web.
              </p>
            </article>

            {/* //////////////////Descomentar y usar esta estructura en el momento en que se comience a hacer uso de datos, y sustituir lo de arriba/////////////// */}
            {/* <article>
              <h3>I. Responsable del tratamiento de tus datos</h3>
              <h4>¿Quién es responsable de sus datos?</h4>
              <strong>Titular: </strong> Campus Canvas, S.L. <br /> <br />
              <strong>NIF: </strong> B09762238 <br /> <br />
              <strong>Domicilio social: </strong> Calle de Juan Montalvo 29,
              Madrid, España <br /> <br />
              <strong>Registro público: </strong> Inscrita en el registro
              mercantil de Madrid, tomo 42930, del archivo general del libro de
              sociedades, folio 193, hoja número M-758914
              <br /> <br />
              <strong>Teléfono de contacto: </strong> 611 516 396
              <br /> <br />
            </article>

            <article>
              <h3>
                II. Finalidad del tratamiento de los datos y categorías de datos
                tratados
              </h3>
              <h4>¿Qué categorías de datos tratamos?</h4>
              <p>
                Dependiendo de la finalidad, Campus Canvas trata las siguientes
                categorías de datos:
              </p>
              <ul>
                <li>
                  Ejemplo 1 de datos: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                  mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                  scelerisque sollicitudin enim eu venenatis. Duis tincidunt
                  laoreet ex, in pretium orci vestibulum eget. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos.
                </li>
                <li>
                  Ejemplo 2 de datos: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                  mollis, auctor consequat urna. Morbi a bi
                </li>
                <li>
                  Ejemplo 3 de datos: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                  mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                  scelerisque sollicitudin enim eu venenatis. Duis tincidunt
                  laoreet ex, in pretium
                </li>
                <li>
                  Ejemplo 4 de datos: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                  mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                  scelerisque sollicitudin
                </li>
              </ul>
              <h4>
                ¿Con qué finalidad y durante cuánto tiempo trataremos tus datos
                personales?
              </h4>
              <p>
                Se tratarán tus datos de manera manual y/o automatizada para las
                siguientes finalidades:
              </p>
              <ul>
                <li>
                  Ejemplo 1 de finalidad: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Quisque nisl eros, pulvinar
                  facilisis justo mollis, auctor consequat urna. Morbi a
                  bibendum metus. Donec scelerisque sollicitudin enim eu
                  venenatis. Duis tincidunt laoreet ex, in pretium orci
                  vestibulum eget. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos.
                </li>
                <li>
                  Ejemplo 2 de finalidad: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Quisque nisl eros, pulvinar
                  facilisis justo mollis, auctor consequat urna. Morbi a bi
                </li>
                <li>
                  Ejemplo 3 de finalidad: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Quisque nisl eros, pulvinar
                  facilisis justo mollis, auctor consequat urna. Morbi a
                  bibendum metus. Donec scelerisque sollicitudin enim eu
                  venenatis. Duis tincidunt laoreet ex, in pretium
                </li>
                <li>
                  Ejemplo 4 de finalidad: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Quisque nisl eros, pulvinar
                  facilisis justo mollis, auctor consequat urna. Morbi a
                  bibendum metus. Donec scelerisque sollicitudin
                </li>
              </ul>

              <h4>¿Cuánto tiempo guardamos tus datos?</h4>
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
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
              <h4>
                ¿Qué medidas de seguridad implementamos para cuidar tus datos?
              </h4>
              <p>
                Para evitar la pérdida, manipulación, difusión o alteración de
                tus datos, Campus Canvas implementa las siguientes medidas
              </p>
              <ul>
                <li>
                  Ejemplo 1 de implementación: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Quisque nisl eros, pulvinar
                  facilisis justo mollis, auctor consequat urna. Morbi a
                  bibendum metus. Donec scelerisque sollicitudin enim eu
                  venenatis. Duis tincidunt laoreet ex, in pretium orci
                  vestibulum eget. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos.
                </li>
                <li>
                  Ejemplo 2 de implementación: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Quisque nisl eros, pulvinar
                  facilisis justo mollis, auctor consequat urna. Morbi a bi
                </li>
                <li>
                  Ejemplo 3 de implementación: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Quisque nisl eros, pulvinar
                  facilisis justo mollis, auctor consequat urna. Morbi a
                  bibendum metus. Donec scelerisque sollicitudin enim eu
                  venenatis. Duis tincidunt laoreet ex, in pretium
                </li>
                <li>
                  Ejemplo 4 de implementación: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Quisque nisl eros, pulvinar
                  facilisis justo mollis, auctor consequat urna. Morbi a
                  bibendum metus. Donec scelerisque sollicitudin
                </li>
              </ul>
            </article>
            <article>
              <h3>III. Legitimación</h3>
              <h4>
                ¿Cuál es la legitimación para el tratamiento de sus datos?
              </h4>
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
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
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
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
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
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
            </article>
            <h3>IV. Comunicaciones de datos</h3>
            <h4>¿A qué destinatarios se comunicarán tus datos?</h4>
            <ul>
              <li>
                Ejemplo 1 de destinatario: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bibendum
                metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
                tincidunt laoreet ex, in pretium orci vestibulum eget. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos.
              </li>
              <li>
                Ejemplo 2 de destinatario: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bi.
              </li>
            </ul>
            <article />
            <article>
              <h3>V. Otros datos que tratamos en Campus Canvas</h3>

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
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
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
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
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
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
            </article>
            <article>
              <h3>VI. Derechos de los usuarios</h3>
              <h4>¿Qué derechos tiene el interesado?</h4>
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
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
              <ul>
                <li>
                  {' '}
                  Ejemplo 1 de derecho: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                  mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                  scelerisque sollicitudin enim eu venenatis. Duis tincidunt
                  laoreet ex, in pretium orci vestibulum eget. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos.
                </li>
                <li>
                  Ejemplo 2 de derecho: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                  mollis, auctor consequat urna. Morbi a bi
                </li>
                <li>
                  Ejemplo 3 de derecho: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                  mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                  scelerisque sollicitudin enim eu venenatis. Duis tincidunt
                  laoreet ex, in pretium
                </li>
                <li>
                  Ejemplo 4 de derecho: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                  mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                  scelerisque sollicitudin
                </li>
              </ul>
            </article> */}
            <div className='main__bottom'>
              <h4>Última actualización: 22/03/2022</h4>
              <h4>
                Copyright ® Campus Canvas 2022. Todos los derechos reservados
              </h4>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default politicasPrivacidad;
