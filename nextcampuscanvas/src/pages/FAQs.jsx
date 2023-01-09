import Link from 'next/link';

//Styles
import styles from '@pagestyles/FAQs.module.scss';

//Components
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

function FAQs() {
  return (
    <>
      <SEOHeader
        tabTitle={'Preguntas frecuentes'}
        metaName={'Preguntas frecuentes'}
        description={'Preguntas frecuentes hechas por empresas y estudiantes'}
      />

      <Layout>
        <div>
          {/* /////////////////////////
            //       Main        //
          ///////////////////////// */}
          <main>
            <ButtonUp />
            <div className={`${styles.main__container} container`}>
              <h2 className={styles.main__title}>Preguntas frecuentes</h2>
              <section className='main__questionList'>
                <h4>¿Por qué Campus Box es totalmente gratis?</h4>
                <p>
                  El contenido de nuestra <strong>Campus Box</strong> es
                  patrocinado por empresas que quieren dar a conocer y promover
                  sus productos exclusivamente entre los estudiantes
                  universitarios de toda España peninsular; ¿Qué mejor manera de
                  hacerlo que obsequiándotelos para que puedas disfrutar de
                  ellos? 😉
                </p>

                <h4>¿Cómo puedo obtener mi Campus Box?</h4>
                <p>
                  Si eres estudiante de España peninsular, puedes solicitar tu{' '}
                  <strong>Campus Box</strong> cada semestre. Para ello, debes
                  completar el proceso de registro y verificación en{' '}
                  <Link href={'/auth/registro'}>nuestra web</Link> y listo, ¡ya
                  podrás solicitar tu <strong>Campus Box</strong>!
                </p>

                <h4>¿Dónde recibiré mi Campus Box?</h4>
                <p>
                  Una vez completado el proceso de registro y verificación,
                  existen dos maneras en las que puedes recibir tu{' '}
                  <strong>Campus Box</strong>:
                </p>
                <ol>
                  <li>
                    <strong>En nuestras oficinas en Madrid:</strong> Una vez que
                    hayas solicitado tu <strong>Campus Box</strong>, recibirás
                    un mensaje de confirmación con la fecha y dirección en la
                    que puedes ir a retirar personalmente tu{' '}
                    <strong>Campus Box</strong> totalmente gratis.
                  </li>
                  <li>
                    <strong>A través de correo postal:</strong> ¿Vives fuera de
                    Madrid o no puedes retirarla personalmente? ¡No te
                    preocupes! También puedes solicitar que tu Campus Box llegue
                    hasta la puerta de tu casa. ¡Tú solo pagas el envió!
                  </li>
                </ol>

                <h4>
                  No puedo completar mi proceso de verificación y registro a
                  través de mi email universitario. ¿Qué hago?
                </h4>
                <ul>
                  <li>
                    <h5>No encuentro mi universidad</h5>
                    <p>
                      Posiblemente tu universidad no se encuentra en nuestra
                      lista, ¡pero no te desanimes! Escríbemos un Email a{' '}
                      <a href='mailto:campuscanvas.info@gmail.com'>
                        <span>campuscanvas.info@gmail.com</span>
                      </a>{' '}
                      y coméntanos cuál es tu universidad para añadirla a
                      nuestro listado de universidades. Estamos constantemente
                      en expansión y seguramente en un futuro próximo también tu
                      universidad será incluida en nuestra lista. También nos lo
                      puedes comentar a través de{' '}
                      <a href='#footer'>redes sociales</a> y con mucho gusto te
                      enviaremos toda la información que necesites.
                    </p>
                  </li>
                  <li>
                    <h5>Me equivoqué al introducir mi universidad</h5>
                    <p>
                      Si al momento de introducir tu correo universitario en el
                      paso 3 de verificación recibes el mensaje{' '}
                      <strong>
                        "La dirección de correo no pertenece a tu universidad"
                      </strong>
                      , y crees que al ingresar tu universidad en el paso 2 te
                      equivocaste, tendrás que eliminar tu cuenta y volver a
                      iniciar el proceso de registro. Pare ello, dirígete al
                      apartado "cuenta" del menú desplegable de tu perfil y
                      selecciona la opción "Eliminar mi cuenta"
                    </p>
                  </li>
                </ul>

                <h4>
                  ¿No llegó tu Campus Box a tu domicilio o no pudiste recogerla
                  en la fecha indicada? ¿Puedo obtener o solicitar una
                  nuevamente?
                </h4>
                <p>
                  ¡Tranquilo! Si solicitaste tu Campus Box vía correo postal y
                  aun no te ha llegado, o bien no pudiste retirar tu Campus Box
                  en nuestras oficinas en Madrid en la fecha indicada, consulta
                  nuestros términos y condiciones, en el apartado{' '}
                  <Link href={'/condiciones'}>
                    2. “Envío y entrega de pedidos”
                  </Link>
                  . Si tienes dudas al respecto, puedes ponerte en{' '}
                  <Link href='/contacto'>contacto </Link> con nosotros y
                  solucionaremos cualquier inconveniente de este tipo.
                </p>

                <h4>
                  Me gustaría promocionar un producto con ustedes, ¿Dónde puedo
                  encontrar información?
                </h4>
                <p>
                  Puedes enviarnos un Email a{' '}
                  <a href='mailto:campuscanvas.info@gmail.com'>
                    <span>campuscanvas.info@gmail.com</span>
                  </a>{' '}
                  o utilizar nuestro{' '}
                  <Link href='/contacto'> formulario de contacto </Link>. Nos
                  pondremos en contacto contigo y con mucho gusto te enviaremos
                  toda la información requerida.
                </p>
              </section>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}

export default FAQs;
