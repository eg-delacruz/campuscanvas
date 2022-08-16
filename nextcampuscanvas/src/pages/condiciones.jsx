import Link from 'next/link';

//Styles
import styles from '@pagestyles/TerminosCondiciones.module.scss';

//Components
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

function TerminosCondiciones() {
  return (
    <>
      <SEOHeader
        tabTitle={'Términos y condiciones'}
        metaName={'Terminos y condiciones'}
        description={'Estos son nuestros términos y condiciones'}
      />

      <Layout>
        <div className={styles.body__gridcontainer}>
          <section className={styles.main}>
            <div className={`${styles.main__container} container`}>
              <ButtonUp />
              <h2>Términos y condiciones</h2>
              <article>
                <h3>Identificación del titular de la Web.</h3>
                <strong>Introducción</strong>
                <br />
                <p>
                  Este documento contractual regirá las Condiciones Generales de
                  contratación de los productos y servicios (en adelante,
                  «Condiciones») a través del sitio web{' '}
                  <Link href={'/'}>campuscanvas.net</Link> , propiedad de Campus
                  Canvas, S.L. bajo la marca comercial de Campus Canvas SL, en
                  adelante, PRESTADOR, cuyos datos de contacto figuran también
                  en el Aviso Legal de esta Web.
                </p>
                <p>
                  Estas Condiciones permanecerán publicadas en el sitio web a
                  disposición del USUARIO para reproducirlas y guardarlas como
                  confirmación del contrato, pudiendo ser modificadas en
                  cualquier momento por Campus Canvas, S.L.. Es responsabilidad
                  del USUARIO leerlas periódicamente, ya que resultarán
                  aplicables aquellas que se encuentren vigentes en el momento
                  de realización de pedidos. Campus Canvas, S.L. archivará el
                  documento electrónico donde se formalice la compra y lo tendrá
                  a disposición del USUARIO por si éste se lo solicita.
                </p>
                <p>
                  Los contratos no estarán sujetos a formalidad alguna con
                  excepción de los supuestos expresamente señalados en los
                  Códigos Civil y de Comercio y en esta o en otras leyes
                  especiales.
                </p>
                <p>La aceptación de este documento conlleva que el USUARIO:</p>
                <ul>
                  <li>Ha leído, entiende y comprende lo aquí expuesto.</li>
                  <li>
                    Es una persona con capacidad suficiente para contratar.
                  </li>
                  <li>Asume todas las obligaciones aquí dispuestas.</li>
                </ul>
                <p>
                  Estas condiciones tendrán un período de validez indefinido y
                  serán aplicables a todas las contrataciones realizadas a
                  través del sitio web del PRESTADOR.
                </p>
                <p>
                  El PRESTADOR informa de que el comercio es responsable y
                  conoce la legislación vigente de los países a los que envía
                  los productos, y se reserva el derecho de modificar
                  unilateralmente las condiciones, sin que ello pueda afectar a
                  los bienes o promociones que fueron adquiridos previamente a
                  la modificación.
                </p>
                <br />
                <strong>Identidad de las partes contratantes</strong>
                <br />
                <p>
                  Por un lado, el PRESTADOR de los productos y servicios
                  contratados por el USUARIO es Campus Canvas, S.L., con
                  domicilio social en Calle de Juan Montalvo, 29 - 28040 Madrid
                  (Madrid), NIF B09762238 y con teléfono de atención al cliente
                  611516396.
                </p>
                <p>
                  Y de otro, el USUARIO, registrado en el sitio web mediante un
                  nombre de usuario y contraseña, sobre los que tiene
                  responsabilidad plena de uso y custodia, y es responsable de
                  la veracidad de los datos personales facilitados al PRESTADOR.
                </p>
                <br />
                <strong>Objeto del contrato</strong>
                <br />
                <p>
                  El presente contrato tiene por objeto regular la relación
                  contractual de compraventa nacida entre el PRESTADOR y el
                  USUARIO en el momento en que este acepta durante el proceso de
                  contratación en línea la casilla correspondiente.
                </p>
                <p>
                  La relación contractual de compraventa conlleva la entrega, a
                  cambio de un precio determinado y públicamente expuesto a
                  través del sitio web, de un producto concreto.
                </p>
                <strong>Rectificación de los datos</strong>
                <br />
                <p>
                  Cuando el USUARIO identifique errores en los datos publicados
                  en el sitio web o en los documentos generados por la relación
                  contractual, podrá notificarlo al correo
                  campuscanvas.info@gmail.com para que Campus Canvas, S.L. los
                  corrija a la mayor brevedad posible.
                </p>
                <p>
                  El USUARIO podrá mantener actualizados sus datos accediendo a
                  su cuenta de usuario.
                </p>
                <strong>Procedimiento de contratación</strong>
                <br />
                <p>
                  El USUARIO, para poder acceder a los productos o servicios que
                  ofrece el PRESTADOR, deberá ser mayor de edad o menor de edad
                  emancipado y darse de alta a través del sitio web mediante la
                  creación de una cuenta de usuario. Por ello, el USUARIO deberá
                  proporcionar de manera libre y voluntaria los datos personales
                  que se le requerirán, los cuales se tratarán de conformidad
                  con lo dispuesto en el Reglamento (UE) 2016/679, de 27 de
                  abril de 2016 (GDPR), relativo a la protección de las personas
                  físicas en lo que respecta al tratamiento de datos personales
                  y a la libre circulación de estos datos y la Ley Orgánica
                  3/2018, de 5 de diciembre (LOPDGDD), relativa a la protección
                  de datos de carácter personal y detallada en el Aviso legal y
                  en la Política de privacidad de este sitio web.
                </p>
                <p>
                  El USUARIO seleccionará un nombre de usuario y una contraseña,
                  comprometiéndose a hacer un uso diligente de los mismos y a no
                  ponerlos a disposición de terceros, así como a comunicar al
                  PRESTADOR la pérdida o robo de los mismos o el posible acceso
                  por un tercero no autorizado, de manera que este proceda al
                  bloqueo inmediato.
                </p>
                <p>
                  Una vez ha sido creada la cuenta de usuario, se informa de que
                  conforme a lo que exige el artículo 27 de la Ley 34/2002, de
                  Servicios de la Sociedad de la Información y del Comercio
                  Electrónico (LSSICE), el procedimiento de contratación seguirá
                  los siguientes pasos:
                </p>
                <ol>
                  <li>Cláusulas generales de contratación.</li>
                  <li>Envío y entrega de pedidos.</li>
                  <li>Derecho de desistimiento.</li>
                  <li>Reclamaciones y resolución de litigios en línea.</li>
                  <li>Fuerza mayor.</li>
                  <li>Competencia.</li>
                  <li>Generalidades de la oferta.</li>
                  <li>Precio y plazo de validez de la oferta.</li>
                  <li>Gastos de transporte.</li>
                  <li>Forma de pago, gastos y descuentos.</li>
                  <li>Proceso de compra.</li>
                  <li>Disociación y suspensión o rescisión del contrato.</li>
                  <li>Garantías y devoluciones.</li>
                  <li>Ley aplicable y jurisdicción.</li>
                </ol>
                <h3>1. CLÁUSULAS GENERALES DE CONTRATACIÓN</h3>
                <p>
                  Salvo estipulación particular por escrito, la realización de
                  un pedido al PRESTADOR supondrá la aceptación por parte del
                  USUARIO de estas condiciones legales. Ninguna estipulación
                  hecha por el USUARIO podrá diferir de las del PRESTADOR si no
                  ha sido expresamente aceptada por adelantado y por escrito por
                  el PRESTADOR.
                </p>
                <h3>2. ENVÍO Y ENTREGA DE PEDIDOS</h3>
                <p>
                  El PRESTADOR no enviará ningún pedido hasta que haya
                  comprobado que se ha realizado el pago.
                </p>
                <p>
                  Los envíos de mercancías se harán habitualmente mediante
                  MENSAJERÍA EXPRESS (POSTAL EXPRESS, SEUR, UPS, STD, GLS,
                  CORREOS ESPAÑA, etc.), según el destino designado libremente
                  por el USUARIO.
                </p>
                <p>
                  El envío se efectuará una vez se haya confirmado la
                  disponibilidad de la mercancía y comprobado el pago del
                  pedido.
                </p>
                <p>
                  El plazo de entrega estará comprendido entre 2 y 6 días
                  laborables, según la población de destino y la forma de pago
                  elegida. La fecha prevista de envío y entrega se suministrarán
                  previamente a la confirmación del pedido.
                </p>
                <h4>Falta de ejecución del contrato a distancia</h4>
                <p>
                  En caso de no poder ejecutar el contrato porque el producto o
                  servicio contratado no esté disponible en el plazo previsto,
                  se informará al USUARIO de la falta de disponibilidad y de que
                  quedará legitimado para cancelar el pedido y recibir la
                  devolución del importe total pagado sin ningún coste, y sin
                  que por ello se derive ninguna responsabilidad por daños y
                  perjuicios imputable al PRESTADOR.
                </p>
                <p>
                  En caso de retraso injustificado por parte del PRESTADOR
                  respecto a la devolución del importe total, el USUARIO podrá
                  reclamar que se le pague el doble del importe adeudado, sin
                  perjuicio a su derecho de ser indemnizado por los daños y
                  perjuicios sufridos en lo que excedan de dicha cantidad.
                </p>
                <p>
                  El PRESTADOR no asumirá ninguna responsabilidad cuando la
                  entrega del producto o servicio no llegue a realizarse, por
                  ser los datos facilitados por el USUARIO, falsos, inexactos o
                  incompletos.
                </p>
                <p>
                  La entrega se considerará realizada en el momento en que el
                  transportista haya puesto los productos a disposición del
                  USUARIO y este, o el delegado de este, haya firmado el
                  documento de recepción de la entrega.
                </p>
                <p>
                  El PRESTADOR responderá ante el USUARIO de cualquier falta de
                  conformidad que exista en el momento de la entrega del pedido,
                  pudiendo el USUARIO, mediante una simple declaración, exigirle
                  la subsanación de dicha falta de conformidad, la reducción del
                  precio o la resolución del contrato. En cualquiera de estos
                  supuestos el USUARIO podrá exigir, además, la indemnización de
                  daños y perjuicios, si procede.
                </p>
                <p>
                  El USUARIO tendrá derecho a suspender el pago de cualquier
                  parte pendiente del precio del producto adquirido hasta que el
                  PRESTADOR cumpla con las obligaciones establecidas en este
                  contrato.
                </p>
                <p>
                  Corresponde al USUARIO verificar los productos a la recepción
                  y exponer todas las salvedades y reclamaciones que puedan
                  estar justificadas en el documento de recepción de la entrega.
                </p>
                <p>
                  En caso de que la contratación no conlleve la entrega física
                  de ningún producto, sino una activación de descarga en un
                  sitio web, el PRESTADOR informará previamente al USUARIO
                  respecto al procedimiento que debe seguir para realizar esta
                  descarga.
                </p>
                <h3>3. DERECHO DE DESISTIMIENTO</h3>
                <p>
                  Formulario de desistimiento:{' '}
                  <a
                    href='/documents/Formulario_desistimiento.pdf'
                    alt='Formulario de desistimiento'
                    target='_blank'
                  >
                    https://campuscanvas.net/formulario-solicitud-desistimiento.pdf{' '}
                  </a>
                </p>
                <p>
                  El USUARIO dispone de un plazo de catorce días naturales,
                  contados a partir de la fecha de recepción del producto o
                  desde la celebración del contrato de compraventa si fuera una
                  prestación de un servicio, para ejercer el derecho de
                  desistimiento, regulado en el{' '}
                  <a
                    href='https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&b=156&tn=1&p=20140328#a102'
                    target='_blank'
                  >
                    artículo 102 del Real Decreto Legislativo 1/2007
                  </a>
                  , de 16 de noviembre, por el que se aprueba el texto refundido
                  de la Ley General para la Defensa de los Consumidores y
                  Usuarios y otras leyes complementarias, en adelante RDL
                  1/2007. Si el PRESTADOR no cumple con el deber de información
                  y documentación sobre el derecho de desistimiento, el plazo
                  para su ejercicio finalizará doce meses después de la fecha de
                  expiración del período de desistimiento inicial, conforme al{' '}
                  <a
                    href='https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&p=20140328&tn=1#a105'
                    target='_blank'
                  >
                    artículo 105 del RDL 1/2007
                  </a>
                  .
                </p>
                <p>
                  El derecho de desistimiento no será aplicable a los contratos
                  referidos y enumerados en el{' '}
                  <a
                    href='https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&p=20140328&tn=1#a103'
                    target='_blank'
                  >
                    artículo 103 del RDL 1/2007
                  </a>
                  , y que se relacionan{' '}
                  <a
                    href='https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&p=20140328&tn=1#a103'
                    target='_blank'
                  >
                    aquí
                  </a>
                  .
                </p>
                <p>
                  Toda devolución deberá comunicarse al PRESTADOR, solicitando
                  un número de devolución mediante el formulario habilitado para
                  ello, o por correo electrónico a campuscanvas.info@gmail.com,
                  indicando el número de factura o pedido correspondiente.
                </p>
                <p>
                  En caso de que la devolución no se realizara con el embalaje
                  original de entrega, el PRESTADOR podrá cobrar el coste de
                  4,70€ al USUARIO informando previamente de ello a través del
                  mismo canal de comunicación utilizado.
                </p>
                <p>
                  Una vez el USUARIO haya recibido el número de devolución, hará
                  llegar el producto al PRESTADOR, indicando este número en la
                  carta de envío, con los gastos de transporte a su cargo, en el
                  domicilio de Campus Canvas, S.L., Calle de Juan Montalvo, 29 -
                  28040 Madrid (Madrid)
                </p>
                <h3>4. RECLAMACIONES Y RESOLUCIÓN DE LITIGIOS EN LÍNEA</h3>
                <p>
                  Cualquier reclamación que el USUARIO considere oportuna será
                  atendida a la mayor brevedad posible, pudiéndose realizar en
                  las siguientes direcciones de contacto: <br />
                  <br />
                  Postal: Campus Canvas, S.L., Calle de Juan Montalvo, 29 -
                  28040 Madrid (Madrid) <br />
                  Teléfono: 611516396 <br />
                  E-mail: campuscanvas.info@gmail.com <br />
                </p>
                <h4>
                  Resolución de litigios en línea{' '}
                  <i>(Online Dispute Resolution)</i>
                </h4>
                <p>
                  Conforme al Art. 14.1 del Reglamento (UE) 524/2013, la
                  Comisión Europea facilita una plataforma de acceso gratuito
                  para la resolución de conflictos online entre el USUARIO y el
                  PRESTADOR, sin necesidad de recurrir a los tribunales de
                  justicia, mediante la intervención de un tercero, llamado
                  Organismo de resolución de litigios, que actúa de
                  intermediario entre ambos. Este organismo es neutral y
                  dialogará con ambas partes para lograr un acuerdo, pudiendo
                  finalmente sugerir y/o imponer una solución al conflicto.
                </p>
                <p>
                  Enlace a la plataforma ODR:{' '}
                  <a href='http://ec.europa.eu/consumers/odr/' target='_blank'>
                    {' '}
                    http://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <h3>5. FUERZA MAYOR</h3>
                <p>
                  Las partes no incurrirán en responsabilidad ante cualquier
                  falta debida a causa mayor. El cumplimiento de la obligación
                  se demorará hasta el cese del caso de fuerza mayor.
                </p>
                <h3>6. COMPETENCIA</h3>
                <p>
                  El USUARIO no podrá ceder, transferir o transmitir los
                  derechos, responsabilidades y obligaciones contratados en la
                  venta.
                </p>
                <p>
                  Si alguna estipulación de estas condiciones fuera considerada
                  nula o de imposible cumplimiento, la validez, legalidad y
                  cumplimiento del resto no se verán afectados de ninguna
                  manera, ni sufrirán modificación de ningún modo.
                </p>
                <p>
                  El USUARIO declara haber leído, conocer y aceptar las
                  presentes Condiciones en toda su extensión.
                </p>
                <h3>7. GENERALIDADES DE LA OFERTA</h3>
                <p>
                  Todas las ventas y entregas efectuadas por el PRESTADOR se
                  entenderán sometidas a las presentes Condiciones.
                </p>
                <p>
                  Ninguna modificación, alteración o pacto contrario a la
                  Propuesta Comercial de Campus Canvas, S.L. o a lo aquí
                  estipulado, tendrá efecto, salvo pacto expreso por escrito
                  firmado por el PRESTADOR, en este caso, estos pactos
                  particulares prevalecerán.
                </p>
                <h3>8. PRECIO Y PLAZO DE VALIDEZ DE LA OFERTA</h3>
                <p>
                  Los precios que se indican respecto de cada producto o
                  servicio incluyen el Impuesto sobre el Valor Añadido (IVA) u
                  otros impuestos que pudieran ser aplicables. Estos precios, a
                  menos que se indique expresamente lo contrario, no incluyen
                  los gastos de envío o comunicación, manipulación o
                  cualesquiera otros servicios adicionales y anexos al producto
                  adquirido.
                </p>
                <p>
                  Los precios aplicables a cada producto son los publicados en
                  el sitio web y se expresarán en la moneda EURO. El USUARIO
                  asume que la valoración económica de algunos de los productos
                  podrá variar en tiempo real.
                </p>
                <p>
                  Antes de realizar la compra podrá comprobar en línea todos los
                  detalles del presupuesto: artículos, cantidades, precio,
                  disponibilidad, gastos de transporte, cargos, descuentos,
                  impuestos y el total de la compra. Los precios pueden cambiar
                  diariamente mientras no se realice el pedido.
                </p>
                <p>
                  Una vez realizado el pedido, los precios se mantendrán tanto
                  si hay disponibilidad de productos como si no.
                </p>
                <p>
                  Todo pago realizado al PRESTADOR conlleva la emisión de una
                  factura a nombre del USUARIO registrado o de la razón social
                  que este haya informado en el momento de realizar el pedido.
                  Esta factura se enviará en formato papel junto con el producto
                  adquirido. Se podrá descargar la factura en formato PDF
                  accediendo al panel de gestión de la web con la cuenta de
                  usuario. En caso de querer recibirla mediante correo
                  electrónico, deberá solicitarlo por cualquiera de los medios
                  que el PRESTADOR pone a su disposición, informándole de que en
                  cualquier momento podrá revocar dicha decisión.
                </p>
                <p>
                  Para cualquier información sobre el pedido, el USUARIO podrá
                  contactar a través del teléfono de atención al cliente del
                  PRESTADOR 611516396 o vía correo electrónico a la dirección
                  campuscanvas.info@gmail.com.
                </p>
                <h3>9. GASTOS DE TRANSPORTE</h3>
                <p>
                  Los precios publicados en la tienda no incluyen gastos de
                  envío o comunicación, ni de instalación o descarga, o
                  prestaciones complementarias, salvo pacto expreso por escrito
                  en contrario.
                </p>
                <p>
                  Los portes se calcularán en el momento de guardar la cesta o
                  presupuesto, ya que se calculan por el peso de los productos y
                  por la dirección de entrega.
                </p>
                <p>
                  Actualmente, los únicos envíos que se promueven en la página
                  web campuscanvas.net, son los relacionados al servicio Campus
                  Box, los cuales constan de un peso máximo de 5 Kg, y por ende,
                  de una tarifa de transporte fija (IVA incluido) de 4,60 €.
                  Dichos envíos se realizan solamente dentro de España
                  peninsular.
                </p>
                <h3>10. FORMAS DE PAGO, CARGOS Y DESCUENTOS</h3>
                <p>
                  El PRESTADOR es el responsable de las transacciones económicas
                  y posibilita las siguientes formas para efectuar el pago de un
                  pedido:
                </p>
                <ul>
                  <li>Tarjeta de crédito</li>
                  <li>Pay Pal</li>
                </ul>
                <p>
                  El USUARIO podrá utilizar un cupón de descuento en el momento
                  previo a la finalización de la compra en caso de haberlo
                  recibido por parte del PRESTADOR.
                </p>
                <h4>Medidas de seguridad</h4>
                <p>
                  El sitio web utiliza técnicas de seguridad de la información
                  generalmente aceptadas en la industria, tales como SSL, datos
                  introducidos en página segura, firewalls, procedimientos de
                  control de acceso y mecanismos criptográficos, todo ello con
                  el objeto de evitar el acceso no autorizado a los datos. Para
                  lograr estos fines, el usuario/cliente acepta que el prestador
                  obtenga datos para efecto de la correspondiente autenticación
                  de los controles de acceso.
                </p>
                <p>
                  El PRESTADOR se compromete a no permitir ninguna transacción
                  que sea considerada ilegal por las marcas de tarjetas de
                  crédito o el banco adquiriente y que pueda o tenga el
                  potencial de dañar la buena voluntad de los mismos o influir
                  de manera negativa en ellos.
                </p>
                <p>
                  Está prohibida, en virtud de los programas de las marcas de
                  tarjetas, la venta u oferta de un producto o servicio que no
                  cumpla con todas las leyes aplicables al Comprador, Banco
                  Emisor, Comerciante o Titular de la tarjeta o tarjetas.
                </p>
                <h3>11. PROCESO DE COMPRA</h3>
                <p>
                  Cualquier producto de nuestro catálogo se puede añadir a la
                  cesta. En esta, solo se observarán los artículos, la cantidad,
                  el precio y el importe total. Una vez guardada la cesta se
                  procederá a calcular los impuestos, cargos y descuentos según
                  los datos de pago y de envío introducidos.
                </p>
                <p>
                  Las cestas no tienen ninguna vinculación administrativa, solo
                  es un apartado donde se puede simular un presupuesto sin
                  ningún compromiso por ambas partes.
                </p>
                <p>
                  Desde la cesta se puede hacer un pedido siguiendo los pasos
                  siguientes para su correcta formalización:
                </p>
                <ol>
                  <li> - Comprobación de los datos de facturación.</li>
                  <li> - Comprobación de la dirección de envío.</li>
                  <li> - Selección de la forma de pago.</li>
                  <li> - Realizar el pedido (comprar).</li>
                </ol>
                <p>
                  Una vez procesado el pedido, el sistema envía instantáneamente
                  un correo electrónico al departamento de gestión del PRESTADOR
                  y otro al correo del USUARIO confirmando la realización del
                  pedido.
                </p>
                <h4>Pedidos (solicitudes de compra)</h4>
                <p>
                  Previamente a la confirmación del pedido se suministrará
                  información sobre el estado del pedido y la fecha de envío y/o
                  entrega aproximada.
                </p>
                <h3>12. DISOCIACIÓN Y SUSPENSIÓN O RESCISIÓN DEL CONTRATO</h3>
                <p>
                  Si cualquiera de estos términos y condiciones se considerara
                  ilegal, nula o por cualquier razón inaplicable, esta condición
                  se considerará separable y no afectará la validez y
                  aplicabilidad de ninguna de las condiciones restantes.
                </p>
                <p>
                  El PRESTADOR podrá, sin previo aviso, suspender o terminar el
                  acceso del USUARIO a sus servicios, en su totalidad o en
                  parte, cuando el USUARIO no cumpla las obligaciones
                  establecidas en este contrato o cualquier disposición legal,
                  licencia, reglamento, directiva, código de prácticas o
                  políticas que le sean aplicables.
                </p>
                <p>
                  Cuando El PRESTADOR ejerza cualquiera de sus derechos o
                  facultades bajo esta Cláusula, tal ejercicio no perjudicará ni
                  afectará el ejercicio de cualquier otro derecho, facultad o
                  recurso que pueda estar a disposición de El PRESTADOR.
                </p>
                <h3>13. GARANTÍAS Y DEVOLUCIONES</h3>
                <p>
                  Las garantías responderán a lo regulado en el Título referido
                  a "Garantías y servicios posventa" del Real Decreto
                  Legislativo 1/2007, de 16 de noviembre, por el que se aprueba
                  el texto refundido de la Ley General para la Defensa de los
                  Consumidores y Usuarios y otras leyes complementarias, al que
                  puede acceder clicando{' '}
                  <a
                    href='https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&p=20211103&tn=1#tiv-3'
                    target='_blank'
                  >
                    {' '}
                    aquí
                  </a>
                  .
                </p>
                <p>
                  Si se quiere personalizar este apartado, se deberá comprobar
                  que el redactado es conforme a lo regulado en el título de
                  GARANTÍAS Y SERVICIOS POSVENTA del RD Legislativo 1/2007.
                </p>
                <h3>14. LEY APLICABLE Y JURISDICCIÓN</h3>
                <p>
                  Estas condiciones se regirán o interpretarán conforme a la
                  legislación española en aquello que no esté expresamente
                  establecido. Cualquier controversia que pudiera suscitarse de
                  la prestación de los productos o servicios objeto de estas
                  Condiciones se someterá a los juzgados y tribunales del
                  domicilio del USUARIO, al lugar del cumplimiento de la
                  obligación o aquel en que se encuentre el bien si éste fuera
                  inmueble.
                </p>
              </article>

              <div className={styles.main__bottom}>
                <h4>Última actualización: 12/08/2022</h4>
                <h4>
                  Copyright ® Campus Canvas 2022. Todos los derechos reservados
                </h4>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

export default TerminosCondiciones;
