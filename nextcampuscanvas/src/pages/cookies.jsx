//Styles
import styles from '@pagestyles/Cookies.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

function Cookies() {
  return (
    <>
      <SEOHeader
        tabTitle={'Cookies'}
        metaName={'Cookies'}
        description={'Declaración de cookies'}
      />

      <Layout>
        <main className={styles.main}>
          <ButtonUp />
          <div className={`${styles.main__container} container`}>
            <h2>Declaración de cookies</h2>
            <h3>INFORMACIÓN SOBRE COOKIES</h3>
            <p>
              Conforme con la Ley 34/2002, de 11 de julio, de servicios de la
              sociedad de la información y de comercio electrónico (LSSI), en
              relación con el Reglamento (UE) 2016/679 del Parlamento Europeo y
              del Consejo, de 27 de abril de 2016, General de Protección de
              Datos (GDPR) y la Ley Orgánica 3/2018, de 5 de diciembre, de
              Protección de Datos y Garantía de los Derechos Digitales
              (LOPDGDD), es obligado obtener el consentimiento expreso del
              usuario de todas las páginas web que usan cookies prescindibles,
              antes de que este navegue por ellas.
            </p>
            <h3>¿QUÉ SON LAS COOKIES?</h3>
            <p>
              Las cookies y otras tecnologías similares tales como local shared
              objects, flash cookies o píxeles, son herramientas empleadas por
              los servidores Web para almacenar y recuperar información acerca
              de sus visitantes, así como para ofrecer un correcto
              funcionamiento del sitio. <br /> <br />
              Mediante el uso de estos dispositivos se permite al servidor Web
              recordar algunos datos concernientes al usuario, como sus
              preferencias para la visualización de las páginas de ese servidor,
              nombre y contraseña, productos que más le interesan, etc.
            </p>
            <h3>COOKIES AFECTADAS POR LA NORMATIVA Y COOKIES EXCEPTUADAS</h3>
            <p>
              Según la directiva de la UE, las cookies que requieren el
              consentimiento informado por parte del usuario son las cookies de
              analítica y las de publicidad y afiliación, quedando exceptuadas
              las de carácter técnico y las necesarias para el funcionamiento
              del sitio web o la prestación de servicios expresamente
              solicitados por el usuario.
            </p>
            <h3>TIPOS DE COOKIES</h3>
            <h4>SEGÚN LA FINALIDAD</h4>
            <ul>
              <li>
                <strong>Cookies técnicas y funcionales:</strong> son aquellas
                que permiten al usuario la navegación a través de una página
                web, plataforma o aplicación y la utilización de las diferentes
                opciones o servicios que en ella existan.
              </li>
              <li>
                <strong>Cookies analíticas:</strong> son aquellas que permiten
                al responsable de las mismas el seguimiento y análisis del
                comportamiento de los usuarios de los sitios web a los que están
                vinculadas. La información recogida mediante este tipo de
                cookies se utiliza en la medición de la actividad de los sitios
                web, aplicación o plataforma y para la elaboración de perfiles
                de navegación de los usuarios de dichos sitios, aplicaciones y
                plataformas, con el fin de introducir mejoras en función del
                análisis de los datos de uso que hacen los usuarios del
                servicio.
              </li>
              <li>
                <strong>Cookies publicitarias:</strong> son aquellas que
                permiten la gestión, de la forma más eficaz posible, de los
                espacios publicitarios que, en su caso, el editor haya incluido
                en una página web, aplicación o plataforma desde la que presta
                el servicio solicitado en base a criterios como el contenido
                editado o la frecuencia en la que se muestran los anuncios.
              </li>
              <li>
                <strong>Cookies de publicidad comportamental:</strong> recogen
                información sobre las preferencias y elecciones personales del
                usuario (retargeting) para permitir la gestión, de la forma más
                eficaz posible, de los espacios publicitarios que, en su caso,
                el editor haya incluido en una página web, aplicación o
                plataforma desde la que presta el servicio solicitado.
              </li>
              <li>
                <strong>Cookies sociales:</strong> son establecidas por las
                plataformas de redes sociales en los servicios para permitirle
                compartir contenido con sus amigos y redes. Las plataformas de
                medios sociales tienen la capacidad de rastrear su actividad en
                línea fuera de los Servicios. Esto puede afectar al contenido y
                los mensajes que ve en otros servicios que visita.
              </li>
              <li>
                <strong>Cookies de afiliados:</strong> permiten hacer un
                seguimiento de las visitas procedentes de otras webs, con las
                que el sitio web establece un contrato de afiliación (empresas
                de afiliación).
              </li>
              <li>
                <strong>Cookies de seguridad:</strong> almacenan información
                cifrada para evitar que los datos guardados en ellas sean
                vulnerables a ataques maliciosos de terceros.
              </li>
            </ul>
            <h4>SEGÚN LA PROPIEDAD</h4>
            <ul>
              <li>
                <strong>Cookies propias:</strong> son aquellas que se envían al
                equipo terminal del usuario desde un equipo o dominio gestionado
                por el propio editor y desde el que se presta el servicio
                solicitado por el usuario.
              </li>
              <li>
                <strong>Cookies de terceros:</strong> son aquellas que se envían
                al equipo terminal del usuario desde un equipo o dominio que no
                es gestionado por el editor, sino por otra entidad que trata los
                datos obtenidos través de las cookies.
              </li>
            </ul>
            <h4>SEGÚN EL PLAZO DE CONSERVACIÓN</h4>
            <ul>
              <li>
                <strong>Cookies de sesión:</strong> son un tipo de cookies
                diseñadas para recabar y almacenar datos mientras el usuario
                accede a una página web.
              </li>
              <li>
                <strong>Cookies persistentes:</strong> son un tipo de cookies en
                el que los datos siguen almacenados en el terminal y pueden ser
                accedidos y tratados durante un período definido por el
                responsable de la cookie, y que puede ir de unos minutos a
                varios años.
              </li>
            </ul>
            <h3>TRATAMIENTO DE DATOS PERSONALES</h3>
            Campus Canvas, S.L. es el{' '}
            <strong>Responsable del tratamiento</strong> de los datos personales
            del <strong>Interesado</strong> y le informa de que estos datos
            serán tratados de conformidad con lo dispuesto en el Reglamento (UE)
            2016/679, de 27 de abril de 2016 (GDPR), por lo que se le facilita
            la siguiente información del tratamiento: <br />
            <br />
            <strong>Fines del tratamiento:</strong> según se especifica en el
            apartado de cookies que se utilizan en este sitio web. <br />
            <br />
            <strong>Legitimación del tratamiento:</strong> salvo en los casos en
            los que resulte necesario para la navegación por la web, por
            consentimiento del interesado (art. 6.1 GDPR). <br />
            <br />
            <strong>Criterios de conservación de los datos:</strong> según se
            especifica en el apartado de cookies utilizadas en la web. <br />
            <br />
            <strong>Comunicación de los datos:</strong> no se comunicarán los
            datos a terceros, excepto en cookies propiedad de terceros o por
            obligación legal. <br />
            <br />
            <strong>Derechos que asisten al Interesado:</strong>
            <br />
            <ul>
              <li>Derecho a retirar el consentimiento en cualquier momento.</li>
              <li>
                Derecho de acceso, rectificación, portabilidad y supresión de
                sus datos, y de limitación u oposición a su tratamiento.
              </li>
              <li>
                Derecho a presentar una reclamación ante la Autoridad de control
                (www.aepd.es) si considera que el tratamiento no se ajusta a la
                normativa vigente.
              </li>
            </ul>
            <strong>Datos de contacto para ejercer sus derechos:</strong> <br />
            <br />
            Campus Canvas, S.L.. Calle de Juan Duque, 20 - 28005 Madrid
            (Madrid). E-mail: campuscanvas.info@gmail.com
            <br />
            <br />
            <strong>
              Cambios en la configuración de cookies en nuestra web
            </strong>
            <p>
              En nuestra web podrás hacer cambios a tus preferencias de cookies
              en cualquier momento haciendo click en el enlace que abrirá el
              panel de configuración de cookies. Dicho enlace lo encontrarás más
              abajo en esta misma página. Desde este panel podrá configurar las
              cookies que el sitio web puede instalar en su navegador, excepto
              las cookies técnicas o funcionales que son necesarias para la
              navegación y la utilización de las diferentes opciones o servicios
              que se ofrecen.
            </p>
            <br />
            <table className={styles.manage_cookies}>
              <thead>
                <tr>
                  <th colSpan='2'>
                    CÓMO GESTIONAR LAS COOKIES DESDE EL NAVEGADOR
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={styles.manage_cookies__column1}>
                    Eliminar las cookies del dispositivo
                  </td>
                  <td>
                    Las cookies que ya están en un dispositivo se pueden
                    eliminar borrando el historial del navegador, con lo que se
                    suprimen las cookies de todos los sitios web visitados. Sin
                    embargo, también se puede perder parte de la información
                    guardada (por ejemplo, los datos de inicio de sesión o las
                    preferencias de sitio web).
                  </td>
                </tr>
                <tr>
                  <td className={styles.manage_cookies__column1}>
                    Gestionar las cookies específicas del sitio
                  </td>
                  <td>
                    Para tener un control más preciso de las cookies específicas
                    de cada sitio, los usuarios pueden ajustar su configuración
                    de privacidad y cookies en el navegador.
                  </td>
                </tr>
                <tr>
                  <td className={styles.manage_cookies__column1}>
                    Bloquear las cookies
                  </td>
                  <td>
                    Aunque la mayoría de los navegadores modernos se pueden
                    configurar para evitar que se instalen cookies en los
                    dispositivos, eso puede obligar al ajuste manual de
                    determinadas preferencias cada vez que se visite un sitio o
                    página. Además, algunos servicios y características pueden
                    no funcionar correctamente (por ejemplo, los inicios de
                    sesión con perfil).
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <table className={styles.manage_cookies}>
              <thead>
                <tr>
                  <th colSpan='2'>
                    CÓMO ELIMINAR LAS COOKIES DE LOS NAVEGADORES MÁS COMUNES
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={styles.manage_cookies__column1}>Chrome</td>
                  <td className={styles.manage_cookies__column2}>
                    <a
                      href='https://support.google.com/chrome/answer/95647?hl=es'
                      target='_blank'
                    >
                      https://support.google.com/chrome/answer/95647?hl=es
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className={styles.manage_cookies__column1}>Edge</td>
                  <td className={styles.manage_cookies__column2}>
                    <a
                      href='https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
                      target='_blank'
                    >
                      https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className={styles.manage_cookies__column1}>Explorer</td>
                  <td className={styles.manage_cookies__column2}>
                    <a
                      href='https://support.microsoft.com/es-es/topic/c%C3%B3mo-eliminar-archivos-de-cookies-en-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc'
                      target='_blank'
                    >
                      https://support.microsoft.com/es-es/topic/c%C3%B3mo-eliminar-archivos-de-cookies-en-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className={styles.manage_cookies__column1}>Firefox</td>
                  <td className={styles.manage_cookies__column2}>
                    <a
                      href='https://www.mozilla.org/es-ES/privacy/websites/#cookies'
                      target='_blank'
                    >
                      https://www.mozilla.org/es-ES/privacy/websites/#cookies
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className={styles.manage_cookies__column1}>Safari</td>
                  <td className={styles.manage_cookies__column2}>
                    <a
                      href='https://support.apple.com/es-es/guide/safari/sfri11471/mac'
                      target='_blank'
                    >
                      https://support.apple.com/es-es/guide/safari/sfri11471/mac
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className={styles.manage_cookies__column1}>Opera</td>
                  <td className={styles.manage_cookies__column2}>
                    <a
                      href='https://help.opera.com/en/latest/security-and-privacy/#clearBrowsingData'
                      target='_blank'
                    >
                      https://help.opera.com/en/latest/security-and-privacy/#clearBrowsingData
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <h3>GESTIÓN DE TUS PREFERENCIAS</h3>
            <p>
              Puedes abrir el panel de configuración de cookies haciendo click
              en el siguiente botón:{' '}
            </p>
            <button
              type='button'
              // With the class name pdcc-open-modal in the desired element, the cookie consent modal will be opened
              className={`pdcc-open-modal btn button--unwantedOption ${styles.cookie_config_btn}`}
            >
              Configurar cookies
            </button>
            <div className={styles.main__bottom}>
              <h4>Última actualización: 26/03/2023</h4>
              <h4>
                Copyright ® Campus Canvas {new Date().getFullYear()}. Todos los
                derechos reservados
              </h4>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default Cookies;
