//This component displays the new generated contract in a pdf reader in browser

//See https://www.youtube.com/watch?v=D05ptoe7brY
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//Session
import { useSession } from 'next-auth/react';

//Assets
import coverImage from '@assets/ForDocuments/campus_canvas_cover.png';

//Fonts
import regularOpenSans from '@assets/Fonts/OpenSans-Regular.ttf';
import italicOpenSans from '@assets/Fonts/OpenSans-Italic.ttf';
import boldOpenSans from '@assets/Fonts/OpenSans-Bold.ttf';
import regularPoppins from '@assets/Fonts/Poppins-Regular.ttf';
import italicPoppins from '@assets/Fonts/Poppins-Italic.ttf';
import boldPoppins from '@assets/Fonts/Poppins-Bold.ttf';

const contrato = () => {
  const [state, setState] = useState({
    //NOTE: this loading was "Submitloading" before. If error, check this
    loading: false,
    error: null,
  });
  const [isClient, setIsClient] = useState(false);
  const [contract, setContract] = useState({});

  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route (start)
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }
  if (session) {
    if (
      !(
        session?.token.role === 'super_admin' || session?.token.role === 'admin'
      )
    ) {
      router.push('/');
    }
  }

  useEffect(() => {
    if (
      session?.token.role === 'super_admin' ||
      session?.token.role === 'admin'
    ) {
      setState({ ...state, loading: false });
    }
  }, [session]);
  //Securing route (end)

  useEffect(() => {
    //Needed for NextJS to work only if we are in a browser
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const string_contract = localStorage.getItem('DATA');
      const CONTRACT = JSON.parse(string_contract);
      setContract(CONTRACT);
    }
  }, [isClient]);

  ///////////////////////////Dynamic elements (start)//////////////////////////
  const destinatario =
    contract?.cliente?.tipo === 'juridica'
      ? contract?.cliente?.empresa_representada
      : contract?.cliente?.tipo === 'fisica'
      ? contract?.cliente?.nombre
      : '';

  const opcion_de_pago =
    contract?.contrato?.modalidad_de_pago === 'pago_unico'
      ? `El Cliente satisfará el pago del precio fijo a más tardar el ${contract?.contrato?.fecha_pago_unico} mediante transferencia bancaria a la siguiente cuenta bancaria facilitada por el Publicista: `
      : contract?.contrato?.modalidad_de_pago === 'pago_cuotas'
      ? `El pago en favor del publicista se realizará en 4 cuotas iguales, por un valor de ${contract?.contrato?.valor_por_cuota} € c/u, pagaderas los siguientes días:
    
          Pago 1 previo a la fecha de inicio de distribución: ${contract?.contrato?.fecha_primera_cuota}
        
          Pago 2: primeros 5 días del mes de ${contract?.contrato?.fecha_segunda_cuota}
          
          Pago 3: primeros 5 días del mes de ${contract?.contrato?.fecha_tercera_cuota}
          
          Pago 4: primeros 5 días del mes de  ${contract?.contrato?.fecha_cuarta_cuota}
          
      El Cliente satisfará cada pago mediante transferencias bancarias a la siguiente cuenta bancaria facilitada por el Publicista: 
      `
      : '';

  const empresa_representada =
    contract?.cliente?.tipo === 'juridica'
      ? `En representación de ${contract?.cliente?.empresa_representada}`
      : '';
  ///////////////////////////Dynamic elements (end)//////////////////////////

  //////////////////////////Styles start //////////////////////////////
  Font.register({
    family: 'Open Sans',
    src: regularOpenSans,
  });

  Font.register({
    family: 'Open Sans Italic',
    src: italicOpenSans,
  });
  Font.register({
    family: 'Open Sans Bold',
    src: boldOpenSans,
  });
  Font.register({
    family: 'Poppins',
    src: regularPoppins,
  });
  Font.register({
    family: 'Poppins Bold',
    src: boldPoppins,
  });
  Font.register({
    family: 'Poppins Italic',
    src: italicPoppins,
  });

  const styles = StyleSheet.create({
    document_content: {
      paddingTop: 35,
      paddingBottom: 40,
      paddingHorizontal: 35,
      fontSize: 9,
    },
    header: {
      fontSize: 9,
      marginBottom: 20,
      textAlign: 'right',
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      paddingHorizontal: 50,
      fontSize: 9,
    },
    bold_open_sans: {
      fontFamily: 'Open Sans Bold',
      fontSize: 9,
    },
    cover_title: {
      fontFamily: 'Poppins Bold',
      fontSize: 35,
      color: '#005ef5',
      marginBottom: 20,
    },
    cover_subtitle: {
      fontSize: 16,
      fontFamily: 'Poppins Bold',
    },
    cover_bottom_information: {
      position: 'absolute',
      zIndex: 2,
      top: 650,
      left: 0,
      right: 0,
      paddingHorizontal: 50,
    },
    cover_highlight_info: {
      backgroundColor: '#e3efff',
      borderColor: '#1e0230',
      borderWidth: '1px',
      borderStyle: 'solid',
      paddingHorizontal: 8,
      paddingTop: 3,
      paddingBottom: 3,
      maxWidth: '85%',
      marginTop: 20,
    },
    cover_cc_info: {
      marginTop: 9,
    },
    content_h2: {
      color: '#005ef5',
      fontFamily: 'Poppins Bold',
      fontSize: 18,
      marginBottom: 8,
    },
    content_h3: {
      fontFamily: 'Poppins Bold',
      fontSize: 16,
      marginBottom: 8,
    },
    content_h4: {
      fontFamily: 'Poppins Bold',
      fontSize: 14,
      marginBottom: 8,
    },
    content_h5: {
      fontFamily: 'Poppins Bold',
      fontSize: 10,
      marginBottom: 8,
    },
    paragraph_regular: {
      textAlign: 'justify',
      fontFamily: 'Open Sans',
      marginBottom: 15,
    },
    bleeding_text: {
      paddingLeft: 20,
      textAlign: 'justify',
      fontFamily: 'Open Sans',
      marginBottom: 15,
    },
    br: {
      marginTop: 20,
    },
  });

  //////////////////////////Styles end //////////////////////////////

  Font.registerHyphenationCallback((word) => [word]);

  return (
    <>
      {isClient && (
        <div style={{ minHeight: '100vh' }}>
          <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
              <Page size={'A4'} style={styles.document_content}>
                <Text style={styles.header} fixed>
                  <Text style={styles.bold_open_sans}>No. contrato: </Text>
                  {contract?.contrato?.numero_contrato}
                </Text>

                {/* Cover (start) */}
                <Text style={styles.cover_title}>
                  CONTRATO DE SERVICIOS DE PUBLICIDAD
                </Text>
                <Text style={styles.cover_subtitle}>
                  {contract?.contrato?.periodo}
                </Text>

                <Image src={coverImage.src} styles={{ marginBottom: 40 }} />
                <Text style={{ marginBottom: 60 }}></Text>

                <View style={styles.cover_bottom_information}>
                  <Text style={styles.bold_open_sans}>
                    Número de contrato: {contract?.contrato?.numero_contrato}
                  </Text>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '49%' }}>
                      <Text style={styles.cover_highlight_info}>
                        {destinatario}
                      </Text>
                      <Text style={styles.cover_highlight_info}>
                        {contract?.contrato?.fecha_de_creacion},{' '}
                        {contract?.contrato?.lugar_de_creacion}
                      </Text>
                    </View>
                    <View style={{ width: '49%' }}>
                      <View style={styles.cover_cc_info}>
                        <Text style={styles.bold_open_sans}>Email:</Text>
                      </View>
                      <Text style={styles.cover_cc_info}>
                        campuscanvas.info@gmail.com
                      </Text>
                      <Text style={styles.cover_cc_info}>
                        <Text style={styles.bold_open_sans}>Tel: </Text>
                        611 516 396
                      </Text>
                      <Text style={styles.cover_cc_info}>
                        www.campuscanvas.net
                      </Text>
                    </View>
                  </View>
                </View>
                {/* Cover (end) */}

                {/* Content */}

                <Text
                  style={[styles.paragraph_regular, { textAlign: 'right' }]}
                >
                  En {contract?.contrato?.lugar_de_creacion}, a{' '}
                  {contract?.contrato?.fecha_de_creacion}
                </Text>
                <Text style={[styles.content_h5, { textAlign: 'center' }]}>
                  REUNIDOS
                </Text>
                <Text style={styles.content_h5}>De una parte,</Text>

                <Text style={styles.paragraph_regular}>
                  Ernesto Gerardo De La Cruz Valle, mayor de edad, con domicilio
                  en Calle de Juan Duque 20, DNI/NIF núm. Y6491644T, y en
                  calidad de administrador único, por tanto, actuando, en virtud
                  de escritura pública y/o autorización pertinente, en nombre y
                  representación de CAMPUS CANVAS SL, con domicilio en Calle de
                  Juan Montalvo 29, CIF/NIF núm. B09762238 e inscrita en:
                  Registro Mercantil de Madrid, con los siguientes datos: Tomo
                  42930, Folio 193, hoja M-758914.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En adelante, el{' '}
                  <Text style={styles.bold_open_sans}>"Publicista".</Text>
                </Text>
                <Text style={[styles.bold_open_sans, { marginBottom: 15 }]}>
                  De otra parte,
                </Text>
                <Text style={styles.paragraph_regular}>
                  {contract?.cliente?.texto_datos}
                </Text>
                <Text style={styles.paragraph_regular}>
                  En adelante, el{' '}
                  <Text style={styles.bold_open_sans}>"Cliente".</Text>
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista y el Cliente que, en adelante, podrán ser
                  denominados, individualmente, la{' '}
                  <Text style={styles.bold_open_sans}>"Parte"</Text> y
                  conjuntamente, las
                  <Text style={styles.bold_open_sans}>"Partes"</Text>,
                  reconociéndose mutuamente la capacidad jurídica necesaria para
                  contratar y obligarse, y en especial, para el otorgamiento del
                  presente CONTRATO DE PUBLICIDAD (en adelante, el
                  <Text style={styles.bold_open_sans}>"Contrato"</Text>)
                </Text>
                <Text style={[styles.content_h5, { textAlign: 'center' }]}>
                  EXPONEN
                </Text>
                <Text style={styles.paragraph_regular}>
                  <Text style={styles.bold_open_sans}>I. </Text>Que el
                  Publicista está especializado en la preparación y realización
                  de las siguientes actividades publicitarias:
                </Text>
                <Text style={styles.bleeding_text}>
                  Campañas publicitarias dirigidas a estudiantes universitarios;
                </Text>
                <Text style={styles.paragraph_regular}>
                  <Text style={styles.bold_open_sans}>II. </Text>Que el
                  Publicista dispone de los conocimientos, experiencia y medios
                  materiales y, en su caso, personales, necesarios para prestar
                  servicios publicitarios;
                </Text>
                <Text style={styles.paragraph_regular}>
                  <Text style={styles.bold_open_sans}>III. </Text>Que el Cliente
                  se dedica a la siguiente actividad:
                </Text>
                <Text style={styles.paragraph_regular}>
                  {contract?.cliente?.actividad}
                </Text>
                <Text style={styles.paragraph_regular}>
                  <Text style={styles.bold_open_sans}>IV. </Text>Que el Cliente
                  desea contar con los servicios publicitarios del Publicista
                  para realizar la promoción de:
                </Text>
                <Text style={styles.paragraph_regular}>
                  {contract?.campana?.producto_a_promover}
                </Text>
                <Text style={styles.paragraph_regular}>
                  <Text style={styles.bold_open_sans}>V. </Text>Que, con el fin
                  de llegar a un acuerdo, las Partes han negociado y aceptado un
                  presupuesto y una propuesta de objetivos y actividades que
                  deberá incluir la campaña publicitaria;
                </Text>
                <Text style={styles.paragraph_regular}>
                  <Text style={styles.bold_open_sans}>VI. </Text>Que, en virtud
                  de lo anterior, el Publicista desea, libre y espontáneamente,
                  comprometerse a la prestación de los servicios publicitarios
                  solicitados por el Cliente, circunstancia que las Partes
                  desean formalizar a través del presente Contrato, que se
                  regirá por las siguientes
                </Text>

                <Text
                  style={[
                    styles.content_h5,
                    { textAlign: 'center', marginTop: 10 },
                  ]}
                >
                  ESTIPULACIONES
                </Text>
                <Text style={styles.content_h5}>
                  PRIMERA. Objeto del Contrato
                </Text>
                <Text style={styles.paragraph_regular}>
                  El objeto del presente Contrato consiste en la realización,
                  por parte del Publicista, de las siguientes actividades
                  publicitarias:
                </Text>
                <Text style={styles.bleeding_text}>
                  Recogida (de ser solicitada), preparación y distribución de
                  productos y/o folletos enviados por correo postal a
                  estudiantes universitarios a través del servicio de cajas
                  publicitarias "Campus Box".
                </Text>
                <Text style={styles.paragraph_regular}>
                  En adelante, la{' '}
                  <Text style={styles.bold_open_sans}>
                    "Campaña publicitaria"
                  </Text>
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista realizará la Campaña de publicidad con total
                  autonomía e independencia respecto del Cliente, en atención a
                  su grado de especialización y conforme a los usos y costumbres
                  de su sector de actividad.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Por último, el desarrollo de la Campaña de publicidad se
                  ceñirá a lo establecido en las estipulaciones de este
                  Contrato, a lo dispuesto en la Ley 34/1988, de 11 de
                  noviembre, General de Publicidad, así como a lo recogido en
                  Código Civil español, y a la restante legislación aplicable.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  SEGUNDA. Modificaciones o ampliaciones del objeto del Contrato
                </Text>
                <Text style={styles.paragraph_regular}>
                  Si durante la vigencia del presente Contrato, el Cliente y/o
                  el Publicista consideran oportuno modificar y/o ampliar la
                  Campaña publicitaria, ambas Partes deberán negociar el alcance
                  de dichas modificaciones o ampliaciones.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Los acuerdos adoptados en la negociación deberán constar por
                  escrito, y quedarán incorporados como anexos al presente
                  Contrato. En el caso que ambas Partes no se pusieran de
                  acuerdo sobre dichas modificaciones o ampliaciones, cualquiera
                  de las Partes podrá resolver el presente Contrato.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En su caso, si el Cliente o el Publicista considera oportuno
                  modificar o alterar la Campaña publicitaria, este deberá
                  notificar a la otra Parte con el fin de negociar y/o acordar
                  el nuevo precio de la misma.
                </Text>
                <Text style={styles.paragraph_regular}>
                  La ampliación de la Campaña publicitaria o la prestación de
                  cualquier servicio adicional o complementario solicitado por
                  el Cliente se regirá por las estipulaciones de este Contrato.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  TERCERA. Características de la Campaña publicitaria
                </Text>
                <Text style={styles.paragraph_regular}>
                  La Campaña publicitaria se realizará por el Publicista
                  atendiendo a las siguientes instrucciones del Cliente:
                </Text>
                <Text style={styles.paragraph_regular}>
                  {contract?.campana?.texto_datos_campana}
                </Text>
                <Text style={styles.paragraph_regular}>
                  Estas características serán, a su vez, necesariamente
                  determinantes del alcance, la forma y el contenido de la
                  Campaña publicitaria.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  CUARTA. Público objetivo de la Campaña publicitaria
                </Text>
                <Text style={styles.paragraph_regular}>
                  {' '}
                  El público objetivo al cual se dirigirá la Campaña
                  publicitaria será el siguiente:
                </Text>
                <Text style={styles.bleeding_text}>
                  El publicista, mediante doble verificación a través de
                  software, garantiza que el producto solamente será enviado al
                  perfil anteriormente mencionado: estudiantes universitarios
                  inscritos en alguna de las universidades en España peninsular.
                </Text>
                <Text style={styles.paragraph_regular}>
                  La forma y el contenido de la Campaña publicitaria deberá
                  diseñarse y adaptarse de tal manera que permita acceder de la
                  mejor forma posible al público objetivo aquí señalado.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  QUINTA. Obligaciones del Publicista
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista se compromete a preparar y ejecutar la Campaña
                  publicitaria de forma diligente y conforme a los usos y
                  costumbres profesionales propios de su sector de actividad.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Igualmente, el Publicista se compromete a realizar la Campaña
                  publicitaria dentro de las fechas y/o plazos e instrucciones
                  acordados con el Cliente.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Además, el Publicista reconoce haber informado al Cliente,
                  previamente a la firma de este Contrato, sobre las
                  características esenciales de la Campaña publicitaria y/o
                  todas las informaciones sobre cómo y/o en qué condiciones se
                  prestan o realizan, además de toda otra información
                  precontractual que fuese necesaria.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  SEXTA. Obligaciones del Cliente
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Cliente se compromete a informar o hacer entrega de toda la
                  información útil y/o relevante y veraz para la correcta
                  ejecución de la Campaña publicitaria. Especialmente, aquellos
                  datos o informaciones relativos a sus necesidades particulares
                  y que contribuirían a una óptima ejecución de la Campaña
                  publicitaria por parte del Publicista.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Asimismo, el Cliente se compromete a colaborar con el
                  Publicista durante el desarrollo de la Campaña publicitaria,
                  no oponiendo impedimentos a la preparación y ejecución de la
                  misma.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Por último, el Cliente se obliga a pagar el precio tal y como
                  resulta del presente Contrato.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  SÉPTIMA. Plazo de ejecución y/o entrega
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Contrato entrará en vigor en la fecha señalada en el
                  encabezado del presente Contrato. El Publicista deberá llevar
                  a cabo el diseño y ejecución de la Campaña publicitaria
                  siguiendo los plazos establecidos a continuación:
                </Text>
                <Text style={styles.bleeding_text}>
                  <Text style={styles.bold_open_sans}>I. </Text>
                  {contract?.contrato?.fecha_inicio}, se deberá completar lo
                  siguiente:
                </Text>
                <Text style={styles.bleeding_text}>
                  Se dará inicio, de haber sido solicitada, la recogida y
                  posterior preparación del producto/folleto a distribuir.
                  Dependiendo del volumen y cantidad del producto, la recogida
                  se efectuará en una o varias visitas al lugar de recogida a lo
                  largo del período de distribución. A través de medios
                  publicitarios online/offline, se dará a conocer a los
                  estudiantes de la disponibilidad de dichas cajas, incitándoles
                  a su adquisición a través de pedido por correo postal o
                  recogida en persona. Ambas opciones serán gestionables a
                  través de la aplicación web del publicista:
                  www.campuscanvas.net
                </Text>
                <Text style={styles.bleeding_text}>
                  <Text style={styles.bold_open_sans}>II. </Text>
                  {contract?.contrato?.fecha_fin}, se deberá completar lo
                  siguiente:
                </Text>
                <Text style={styles.bleeding_text}>
                  El plazo para adquirir las cajas por los estudiantes finaliza.
                  En el supuesto de no haber completado el cien por ciento de la
                  cantidad a distribuir acordada debido a una demanda por debajo
                  de lo estimado por parte de los estudiantes, se optará por lo
                  siguiente, según el cliente vea conveniente:
                </Text>
                <Text style={styles.bleeding_text}>
                  • Se podrá llegar a un acuerdo en el que el publicista se
                  comprometa a continuar con la distribución del
                  producto/folletos durante el semestre próximo respecto al
                  semestre para el cual se pactó la distribución inicialmente.
                </Text>
                <Text style={styles.bleeding_text}>
                  • El publicista hará devolución al cliente del
                  producto/folletos remanentes, así como del importe monetario,
                  en caso de haberlo pagado, proporcional a la cantidad de
                  productos/folletos que no se lograron distribuir en el tiempo
                  estipulado.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En todo caso, siguiendo lo dispuesto en la Estipulación
                  anterior, el Cliente se compromete a colaborar y a aportar
                  toda la información necesaria que le sea requerida por el
                  Publicista para poder preparar la Campaña publicitaria de
                  acuerdo a los plazos establecidos en esta Estipulación. En el
                  caso de que el Cliente no facilite esta información o no
                  preste su colaboración de forma adecuada, el Publicista podrá
                  comunicar por escrito al Cliente su imposibilidad de cumplir
                  con los plazos establecidos en esta Estipulación.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  OCTAVA. Seguimiento de la ejecución del Contrato
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista se compromete, a fin de facilitar el seguimiento
                  de la ejecución del Contrato, a remitir periódicamente al
                  Cliente información y/o documentación sobre el estado de las
                  actividades relacionadas con la Campaña publicitaria.
                </Text>
                <Text style={styles.paragraph_regular}>
                  No obstante, el Cliente se reserva la facultad de exigir al
                  Publicista otra información o documentación adicional que
                  pudiera necesitar para poder realizar un correcto seguimiento
                  de la ejecución de la Campaña publicitaria y, en su caso, que
                  le pueda corresponder según normativa aplicable
                  correspondiente.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  NOVENA. Duración del Contrato
                </Text>
                <Text style={styles.paragraph_regular}>
                  La Campaña publicitaria se extenderá durante un período
                  comprendido entre el {contract?.contrato?.fecha_inicio}, fecha
                  de entrada en vigor del Contrato, y el{' '}
                  {contract?.contrato?.fecha_fin}, fecha en la que termina el
                  Contrato.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  DÉCIMA. Precio y forma de pago
                </Text>
                <Text style={styles.paragraph_regular}>
                  Las Partes acuerdan el pago de una cantidad ascendiente a{' '}
                  {contract?.contrato?.precio_letras} (
                  {contract?.contrato?.precio} €) como remuneración de la
                  ejecución de la Campaña publicitaria, sin incluir los
                  impuestos que pudieran derivar de esta operación.
                </Text>
                <Text style={styles.paragraph_regular}>{opcion_de_pago}</Text>
                <Text style={styles.paragraph_regular}>
                  Entidad bancaria: Banco Bilbao Vizcaya Argentaria (BBVA)
                </Text>
                <Text style={styles.paragraph_regular}>
                  IBAN: ES78 0182 1275 1202 0210 1647
                </Text>
                <Text style={styles.paragraph_regular}>
                  Por último, el Publicista emitirá una factura al Cliente
                  cumpliendo con los requisitos legales necesarios y dentro de
                  los plazos previstos en la legislación actual.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  DECIMOPRIMERA. Intereses de demora
                </Text>
                <Text style={styles.paragraph_regular}>
                  Siguiendo lo recogido en el artículo 1.101 del Código Civil,
                  cualquier retraso en el pago de la remuneración establecida en
                  el presente Contrato dará lugar a un incremento del precio
                  equivalente a los intereses de demora generados por el retraso
                  en el pago.
                </Text>
                <Text style={styles.paragraph_regular}>
                  El tipo de interés de demora será igual al tipo de interés de
                  referencia o de refinanciación semestral del Banco Central
                  Europeo en vigor a 1 de enero para el primer semestre del año
                  correspondiente, y a 1 de julio para el segundo semestre del
                  año correspondiente.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Los intereses de demora serán exigibles automáticamente a
                  partir de la fecha de pago fijada en la Estipulación anterior,
                  sin necesidad alguna de aviso del vencimiento ni intimación
                  alguna por parte del Publicista. El devengo de dichos
                  intereses no afectará al ejercicio de cualquier acción que
                  pueda corresponderle al Publicista derivada del incumplimiento
                  del pago.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  DECIMOSEGUNDA. Recursos y/o materiales para la preparación de
                  la Campaña publicitaria
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista utilizará, para la realización o ejecución de la
                  Campaña publicitaria, los medios materiales adecuados y, en su
                  caso, su propio personal, quienes realizarán sus funciones
                  utilizando los materiales más adecuados, y siguiendo las
                  instrucciones emitidas por el Publicista en consonancia con
                  las obligaciones que asume por el presente Contrato frente al
                  Cliente. El Publicista se compromete, igualmente, a que dicho
                  personal encargado de la preparación de la Campaña
                  publicitaria conozca las necesidades particulares del Cliente.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En especial, el Publicista se compromete a que las personas o
                  empleados que pudieran quedar adscritas a la preparación y
                  ejecución de la Campaña publicitaria tengan la cualificación y
                  experiencia adecuadas para la realización de los trabajos
                  convenidos. Y, asimismo, deberán conocer el contenido de las
                  estipulaciones relativas a propiedad intelectual,
                  confidencialidad, y al tratamiento de los datos de carácter
                  personal que se establecen en el Contrato, así como su
                  obligación personal de respetarlos.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>DECIMOTERCERA. Gastos</Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista se hará cargo de todos los gastos relacionados
                  con la preparación de la Campaña publicitaria. Deberá hacerse
                  cargo del pago de los medios e instrumentos necesarios para
                  poder ejecutar el Contrato correctamente, así como de todos
                  los impuestos o tasas que se devenguen en relación con la
                  Campaña publicitaria, quedando el Cliente completamente
                  indemne del pago de todos estos gastos.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  DECIMOCUARTA. Inexistencia de relación laboral
                </Text>
                <Text style={styles.paragraph_regular}>
                  La relación entre las Partes tiene, exclusivamente, carácter
                  mercantil, no existiendo vínculo laboral alguno entre el
                  Publicista y el Cliente, o, en su caso, el personal de aquel.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En este último supuesto, dicho personal no podrá considerarse,
                  basándose en la existencia de este Contrato o de su
                  cumplimiento, ni de hecho ni de derecho, como un empleado del
                  Cliente y, por ello, dependerá a todos los efectos, incluidos
                  los aspectos laborales y de Seguridad Social, única y
                  exclusivamente de la dirección del Publicista.
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista, asimismo, reconoce que el personal que pudiera
                  colaborar en la preparación de la Campaña publicitaria estará
                  contratado conforme a la Ley y asume cuantas obligaciones se
                  deriven de la legislación social y, en especial, de las
                  disposiciones vigentes en materia de Seguridad Social,
                  Seguridad e Higiene en el Trabajo y prevención de riesgos
                  laborales, eximiendo al Cliente de cualquier responsabilidad
                  que se pudiera derivar como consecuencia de su incumplimiento.
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Cliente, igualmente, renunciará expresamente a contratar,
                  directamente o a través de terceros, a ningún empleado del
                  Publicista mientras no finalice, al menos, el presente
                  Contrato.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En todo caso, el Cliente podrá requerir al Publicista que le
                  facilite una copia de la documentación justificativa de
                  encontrarse al corriente de las obligaciones laborales y
                  tributarias con la Administración o con cualquier tercero
                  jurídicamente obligatorio.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  DECIMOQUINTA. Cumplimiento normativa aplicable
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista se compromete a ejecutar la Campaña publicitaria
                  cumpliendo de forma diligente con toda la normativa aplicable
                  y, en particular, con todas las obligaciones laborales, de la
                  Seguridad Social, fiscales, sobre la competencia desleal y de
                  protección de datos que le sean aplicables en relación con la
                  preparación de la Campaña publicitaria.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  DECIMOSEXTA. Responsabilidad
                </Text>
                <Text style={styles.paragraph_regular}>
                  Incurrirá en responsabilidad cualquiera de las Partes que
                  actúe de forma negligente o culposa en el cumplimiento de las
                  obligaciones establecidas en el presente Contrato y ocasionare
                  con ello un daño o perjuicio a la otra Parte. La Parte que
                  tenga que afrontar cualquier tipo de daño o perjuicio en
                  virtud de la actuación de la otra Parte podrá reclamar una
                  indemnización por los daños y perjuicios ocasionados.
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista realizará la preparación de la Campaña
                  publicitaria con la diligencia y calidad debida,
                  comprometiéndose a asumir la responsabilidad por los errores,
                  defectos o demoras producidas en su ejecución, o por su
                  incorrecta o falta de ejecución. No obstante, el Publicista no
                  será responsable de los errores, defectos o demoras producidas
                  en la ejecución, o la incorrecta ejecución o de la no
                  ejecución del Contrato, cuando esto emane de la omisión o
                  falseamiento de cualquier información, documento o dato
                  facilitado por el Cliente; el Publicista tampoco estará
                  obligado a verificar la autenticidad y exactitud de dichos
                  datos o informaciones.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  DECIMOSÉPTIMA. Elevación a público del Contrato
                </Text>
                <Text style={styles.paragraph_regular}>
                  Cualquiera de las Partes podrá solicitar, mediante
                  requerimiento fehaciente, la elevación a público del presente
                  Contrato.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En ese caso, las Partes elegirán por mutuo acuerdo el Notario
                  o Notaria Público ante el cual se otorgará la escritura
                  pública y la parte solicitante se hará cargo de los
                  correspondientes gastos notariales.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>DECIMOCTAVA. Fuerza mayor</Text>
                <Text style={styles.paragraph_regular}>
                  Ninguna de las Partes podrá ser considerada como responsable
                  de un retraso, defecto o error en la ejecución de sus
                  obligaciones contractuales cuando aquellos son debidos u
                  ocasionados por una causa de fuerza mayor. No obstante, las
                  Partes quedan obligadas a notificar a la otra Parte cuando
                  tengan conocimiento de que una causa de esta naturaleza ha
                  ocurrido y afectará a la correcta ejecución de sus
                  obligaciones.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Se entenderá por "fuerza mayor": inundación, incendio,
                  explosión, avería en la planta de producción, cierre patronal,
                  huelga, disturbio civil, bloqueo, embargo, mandato, ley,
                  orden, regulación, ordenanza, demanda o petición de cualquier
                  Gobierno o de cualquier subdivisión o representante de este, o
                  cualquier otra causa, que esté fuera del control de la Parte
                  involucrada, sin que pueda entenderse que la falta de fondos
                  constituye una causa de fuerza mayor.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  DECIMONOVENA. Obligación de secreto y confidencialidad
                </Text>
                <Text style={styles.paragraph_regular}>
                  Las Partes reconocen que toda la información a la que se pueda
                  tener acceso en el marco del Contrato, ya sea relacionada con
                  la preparación de la Campaña publicitaria o relacionada con la
                  actividad u organización de alguna de las Partes (en adelante,
                  la
                  <Text style={styles.bold_open_sans}>"Información"</Text>),
                  tiene carácter confidencial. De esta forma, las Partes
                  acuerdan no divulgarla y mantener la más estricta
                  confidencialidad respecto de dicha Información, advirtiendo,
                  en su caso, de dicho deber de confidencialidad y secreto a sus
                  empleados, asociados y a cualquier persona que, por su cargo o
                  relación personal o sentimental deba o pueda tener acceso a la
                  misma.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Ninguna de las Partes podrá reproducir, modificar, hacer
                  pública o divulgar a terceros la Información sin previa
                  autorización escrita y expresa de la otra Parte.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Las Partes se comprometen a poner los medios necesarios para
                  que la Información no sea divulgada ni cedida. Adoptarán las
                  mismas medidas de seguridad que adoptarían respecto a la
                  información confidencial de su propiedad, evitando su pérdida,
                  robo o sustracción.
                </Text>
                <Text style={styles.paragraph_regular}>
                  El receptor de la Información se compromete, en su caso, a
                  advertir sobre la existencia del deber de confidencialidad a
                  sus empleados, asociados, y a toda persona a la cual se le
                  facilite la Información, haciéndose responsable del uso
                  indebido que estos puedan hacer de la Información relacionada
                  con el Contrato.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Asimismo, la Parte que recibe la Información se compromete a
                  poner en conocimiento de la otra Parte cualquier acción o
                  incidente por parte de terceros que pueda atentar contra la
                  confidencialidad de la Información.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Ambas Partes se comprometen a que la utilización de la
                  Información solo estará dirigida a alcanzar los objetivos del
                  Contrato y no otros, y que, así, solo estará en conocimiento
                  de aquellas personas estrictamente necesarias para cumplir con
                  aquellos.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Las disposiciones relativas a la confidencialidad previstas en
                  este Contrato se aplicarán durante la vigencia del mismo y
                  prevalecerán durante el siguiente período: 36 meses tras su
                  terminación. Este plazo de tiempo es inmediato a la
                  terminación del Contrato.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGÉSIMA. Protección de datos
                </Text>
                <Text style={styles.paragraph_regular}>
                  Las Partes de este Contrato conocen y se obligan a cumplir el
                  Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo,
                  de 27 de abril de 2016, relativo a la protección de las
                  personas físicas en lo que respecta al tratamiento de datos
                  personales y a la libre circulación de estos datos (RGPD), así
                  como la Ley Orgánica 3/2018, de Protección de Datos Personales
                  y garantía de los derechos digitales y su normativa de
                  desarrollo, y/o aquellas que las pudieran sustituir o
                  actualizar en el futuro.
                </Text>
                <Text style={styles.paragraph_regular}>
                  De esta forma, las Partes son conscientes de que mediante la
                  firma de este Contrato consienten que sus datos personales
                  recogidos en el presente Contrato, así como aquellos que se
                  pudiesen recoger en el futuro para poder dar cumplimiento o
                  una correcta ejecución de este mismo, podrán ser incorporados
                  por la otra Parte a su propio fichero, automatizado o no, de
                  recogida de datos con el fin de ejecutar correctamente la
                  relación contractual y, eventualmente, para una gestión
                  administrativa y/o comercial.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En todo caso, las Partes se comprometen a que estos datos
                  personales no sean comunicados en ningún caso a terceros,
                  aunque, si se diese el caso de que fuera a realizarse algún
                  tipo de comunicación de datos personales, se comprometen
                  siempre y de forma previa, a solicitar el consentimiento
                  expreso, informado, e inequívoco de la Parte que es titular de
                  dichos datos de carácter personal, indicando la finalidad
                  concreta para la que se realizará la comunicación de los
                  datos.
                </Text>
                <Text style={styles.paragraph_regular}>
                  De esta Estipulación no resulta ninguna limitación o
                  restricción para las Partes en cuanto al ejercicio de los
                  derechos de acceso, rectificación, supresión, limitación del
                  tratamiento, portabilidad u oposición con los que pudieran
                  contar.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Respecto de los datos personales a los que el Publicista tenga
                  acceso como consecuencia de la ejecución de la Campaña
                  publicitaria, estos son propiedad exclusiva del Cliente y se
                  entenderán facilitados de forma voluntaria por este, y sólo
                  serán utilizados con la finalidad de preparar la Campaña
                  publicitaria, comprometiéndose el Publicista a no aplicarlos
                  ni utilizarlos para finalidad distinta de la pactada y a no
                  comunicarlos a otras personas, ni siquiera a efectos de
                  conservación. Asimismo, se obliga a devolver íntegramente al
                  Cliente los ficheros, automatizados o no, de datos de carácter
                  personal a los que hubiera tenido acceso, cuando sea requerido
                  a ello por el Cliente, y/o a proceder a la destrucción de los
                  soportes y/o documentos donde se contengan dichos datos al
                  finalizar el presente Contrato, y, en todo caso, al
                  vencimiento del presente Contrato.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En todo caso, el Publicista se compromete a que el tratamiento
                  de los datos de carácter personal a los que tenga acceso por
                  razón de la preparación y ejecución de la Campaña
                  publicitaria, y de cuanta información en general le sea
                  facilitada por el Cliente, sea realizado manteniendo el más
                  estricto secreto profesional y absoluta confidencialidad
                  respecto de los datos de los mismos, así como a cumplir
                  diligentemente el deber de guardia y custodia que sobre los
                  mismos impone el RGPD y la LOPD.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Estos deberes serán exigibles al Publicista durante la
                  vigencia del presente Contrato y aún después de producida la
                  terminación por cualquier causa del mismo, siendo responsable
                  frente al Cliente del incumplimiento de las obligaciones aquí
                  asumidas.Estos deberes serán exigibles al Publicista durante
                  la vigencia del presente Contrato y aún después de producida
                  la terminación por cualquier causa del mismo, siendo
                  responsable frente al Cliente del incumplimiento de las
                  obligaciones aquí asumidas.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Asimismo, el Publicista se compromete a adoptar las medidas
                  técnicas y/u organizativas necesarias para proteger los datos
                  de carácter personal a los que tenga acceso y a evitar su
                  alteración, pérdida, tratamiento y acceso no autorizado, y
                  ello en consonancia con el RGPD, la LOPD y sus normas
                  complementarias de desarrollo.
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista responderá frente al Cliente del incumplimiento
                  de las obligaciones asumidas en virtud de esta Estipulación,
                  incluso cuando dicho incumplimiento sea imputable, en su caso,
                  al personal del cual deberá responder legalmente.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGESIMOPRIMERA. Propiedad intelectual e industrial
                </Text>
                <Text style={styles.paragraph_regular}>
                  Por medio de este Contrato, el Publicista renuncia expresa y
                  formalmente a cuantos derechos de propiedad intelectual o
                  industrial pudieran generarse como consecuencia de la
                  ejecución de la Campaña publicitaria, cuya titularidad
                  corresponderá únicamente al Cliente.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Por otro lado, el Cliente renuncia, de forma expresa, a
                  cuantos derechos de propiedad intelectual o industrial sean
                  aportados por el Publicista para la preparación y desarrollo
                  de la Campaña publicitaria, manteniendo en todo momento el
                  Publicista su titularidad.
                </Text>
                <Text style={styles.paragraph_regular}>
                  No obstante, en el caso de que el Cliente estuviera interesado
                  en la utilización como parte de la ejecución de este Contrato
                  de los derechos de explotación de obras preexistentes
                  protegidas por derechos de propiedad intelectual o industrial
                  propiedad del Publicista, se negociaría su uso expresamente, y
                  caso por caso, entre ambas Partes. El Publicista informaría
                  previamente al Cliente de forma clara y concisa sobre las
                  condiciones de adquisición y/o explotación, para que este
                  pueda decidir libremente sobre los mismos.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGESIMOSEGUNDA. Cesión del Contrato. Subcontratación
                </Text>
                <Text style={styles.paragraph_regular}>
                  Las Partes no podrán ceder su posición en el presente
                  Contrato, ni tampoco los derechos u obligaciones que de este
                  mismo emanasen a su favor o a su cargo, sin el consentimiento
                  previo, expreso y por escrito de la otra Parte.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En particular esta Estipulación regirá de forma que el
                  Publicista se compromete a comunicar al Cliente, por escrito y
                  previamente a la celebración de un acuerdo de subcontratación,
                  su intención de contratar a una parte subcontratista, la
                  identidad de la misma, el tipo de servicios y trabajos a
                  realizar por esta y las condiciones económicas y legales de la
                  relación de subcontratación. Todo ello, en orden de facilitar
                  que el Cliente pueda aprobar dicha subcontratación, sin que
                  dicha autorización suponga la asunción de responsabilidad
                  alguna por parte del Cliente o la aprobación del resultado de
                  los servicios y trabajos que la parte subcontatista provea.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Igualmente, será responsabilidad del Publicista comprobar que
                  la parte subcontratista está autorizada para la prestación de
                  los servicios publicitarios o actividades objeto de
                  subcontratación, así como para regular por escrito la relación
                  contractual con la misma, incorporando o anexando los acuerdos
                  establecidos en el presente Contrato. Además, el Publicista se
                  obliga a entregar al Cliente una copia de dicho contrato en
                  los 5 (cinco) días siguientes a su firma.
                </Text>
                <Text style={styles.paragraph_regular}>
                  La parte subcontratista actuaría en todo momento bajo la
                  dirección y control del Publicista, quien se obliga y
                  responsabiliza a hacer cumplir a la parte subcontratista con
                  todas las obligaciones asumidas en el presente Contrato.
                </Text>
                <Text style={styles.paragraph_regular}>
                  El Publicista responderá solidariamente de las obligaciones
                  que asuma la parte subcontratista, incluso cuando el Cliente
                  hubiera autorizado dicha subcontratación, incluyendo los daños
                  y perjuicios que pudiese sufrir directa o indirectamente por
                  la actuación de dicha parte subcontratista. Del mismo modo,
                  cualquier acto, error o negligencia en el cumplimiento de las
                  obligaciones laborales o de Seguridad Social de la parte
                  subcontratista, de sus representantes, o trabajadores, no
                  serán, en ningún caso, responsabilidad del Cliente.
                </Text>
                <Text style={styles.paragraph_regular}>
                  El incumplimiento de esta Estipulación por el Publicista será
                  motivo suficiente para resolver el presente Contrato.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGESIMOTERCERA. Inexistencia de renuncia
                </Text>
                <Text style={styles.paragraph_regular}>
                  La renuncia de una de las Partes a exigir el cumplimiento de
                  alguna de las obligaciones previstas en el Contrato, o a
                  ejercer alguno de los derechos o acciones que le asisten en
                  virtud del mismo,
                  <strong>(a)</strong> no liberará a la otra Parte del
                  cumplimiento íntegro de las restantes obligaciones contenidas
                  en el Contrato; y,
                  <strong>(b)</strong> no se entenderá como una renuncia a
                  exigir en un futuro el cumplimiento de cualquier obligación o
                  a ejercer derechos o acciones previstos en el Contrato.
                </Text>
                <Text style={styles.paragraph_regular}>
                  La dispensa, aplazamiento o renuncia de alguno de los derechos
                  contemplados en el Contrato, o a una parte de los mismos, será
                  únicamente vinculante si consta por escrito, pudiendo quedar
                  sujeta a las condiciones que el otorgante de dicha dispensa,
                  aplazamiento o renuncia considere oportunas, limitándose al
                  caso concreto en el que se produjo, y no restringirá, en
                  ningún caso, la exigibilidad en otros supuestos del derecho al
                  que afecta.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGESIMOCUARTA. Causas de resolución
                </Text>
                <Text style={styles.paragraph_regular}>
                  Las Partes se comprometen a cumplir las obligaciones que
                  emanan de este Contrato para cada una de ellas en los términos
                  y condiciones establecidos a lo largo del mismo.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En el supuesto de que alguna de las Partes incumpliera alguna
                  de las obligaciones del Contrato, o las cumpliera de forma
                  defectuosa, la Parte que a su vez sí hubiera cumplido con las
                  suyas podrá considerar que ha existido incumplimiento del
                  contrato en los términos establecidos por el artículo 1.124
                  del Código Civil, quedando facultada para optar entre resolver
                  el Contrato o exigir su cumplimiento, reclamando, en ambos
                  casos, la correspondiente indemnización de daños y perjuicios.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Además, el Contrato se considerará resuelto por la insolvencia
                  definitiva o provisional, la suspensión de pagos, la quiebra,
                  el concurso de acreedores, y/o el acuerdo de liquidación de
                  cualquiera de las Partes.
                </Text>
                <Text style={styles.paragraph_regular}>
                  También será causa de resolución anticipada del Contrato las
                  situaciones en las que existan deficiencias recurrentes en la
                  Campaña publicitaria diseñada y ejecutada por el Publicista
                  y/o no fueran conforme a las instrucciones u objetivos
                  establecidos en este Contrato.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Igualmente, será causa de resolución del Contrato cuando el
                  Publicista deje de ejecutar la Campaña publicitaria o parte de
                  la Campaña publicitaria que forma parte del objeto de este
                  Contrato. Se entenderá que el Publicista ha dejado de ejecutar
                  la Campaña publicitaria cuando no se desarrolla dicha
                  actividad regularmente o con los medios materiales y
                  personales adecuados o necesarios.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Cuando el Publicista sea una persona física, el Contrato
                  también será resuelto por causa de su fallecimiento,
                  incapacidad o cualquier otra causa que le imposibilite cumplir
                  con la ejecución del Contrato con la calidad y continuidad a
                  que se compromete en virtud del mismo, con independencia de
                  cualquier otro incumplimiento contractual que pudiera
                  producirse.
                </Text>
                <Text style={styles.paragraph_regular}>
                  La falta de pago de la ejecución de la Campaña publicitaria
                  por parte del Cliente dará derecho al Publicista a rescindir
                  el Contrato y, si lo estimara oportuno, a proceder a su
                  reclamación conforme a la Ley.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Asimismo, se podrá resolver el Contrato por voluntad de
                  cualquiera de las Partes, siempre que la Parte que así lo
                  desee notifique su voluntad a la otra Parte por escrito y
                  conforme al procedimiento de notificación establecido en este
                  Contrato con una antelación mínima de 15 días.
                </Text>
                <Text style={styles.paragraph_regular}>
                  En este último supuesto, cuando se resuelva el Contrato por
                  voluntad del Cliente, este deberá, no obstante, abonar al
                  Publicista toda factura devengada y no pagada relacionada con
                  la Campaña publicitaria durante el tiempo que el Contrato ha
                  estado en vigor, así como una posible indemnización por daños
                  y perjuicios si ejercita su voluntad sin respetar el preaviso
                  y método de notificación aquí establecido. Igualmente, cuando
                  se resuelva el Contrato por voluntad del Publicista, este
                  deberá facilitar al Cliente todo documento, elemento, bien,
                  material, y/o producción que hubiese podido resultar de su
                  actividad de publicitaria hasta ese momento, además de una
                  posible indemnización por daños y perjuicios que pudiera
                  mediar si ejercita su voluntad sin respetar el preaviso y
                  método de notificación aquí previsto.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGESIMOQUINTA. Falta de adaptación de la publicidad a los
                  requisitos del Cliente
                </Text>
                <Text style={styles.paragraph_regular}>
                  En el caso de que la Campaña publicitaria no se ajuste en sus
                  elementos esenciales a los términos establecidos en este
                  Contrato o a las instrucciones expresadas en la Estipulación
                  Tercera, así como las comunicadas durante la ejecución de la
                  Campaña publicitaria, este podrá exigir una rebaja de la
                  contraprestación o la repetición total o parcial de la
                  publicidad en los términos pactados, y la indemnización, en
                  uno y otro caso, de los perjuicios que se le hubieren
                  irrogado. En caso de que el incumplimiento sea notable, será
                  de aplicación lo dispuesto en la Estipulación anterior.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGESIMOSEXTA. Notificaciones
                </Text>
                <Text style={styles.paragraph_regular}>
                  Para realizar cualquier notificación entre las Partes que
                  tenga como origen el presente Contrato, estas acuerdan que su
                  domicilio a efectos de las mismas sean las direcciones
                  indicadas al principio de este Contrato. Para que una
                  notificación entre las Partes sea efectuada de forma válida,
                  deberá realizarse por un medio fehaciente que deje constancia
                  del momento en que ha sido enviada, a qué dirección ha sido
                  enviada y el momento de su recepción por la otra Parte. Cuando
                  se produjera un cambio en el domicilio a efectos de
                  notificaciones, se deberá comunicar esta nueva información, lo
                  más pronto posible, a la otra Parte siguiendo el procedimiento
                  aquí establecido.
                </Text>
                <Text style={styles.paragraph_regular}>
                  No obstante, siempre y cuando sea posible garantizar la
                  autenticidad del emisor, del destinatario, y del contenido del
                  mensaje, y con el objetivo de mantener una comunicación fluida
                  entre las Partes, se facilitan las siguientes direcciones de
                  correo electrónico:
                </Text>
                <Text style={styles.paragraph_regular}>EL PUBLICISTA:</Text>
                <Text style={styles.bleeding_text}>
                  campuscanvas.info@gmail.com
                </Text>
                <Text style={styles.paragraph_regular}>El CLIENTE:</Text>
                <Text style={styles.bleeding_text}>
                  {contract?.cliente?.correo}
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGESIMOSÉPTIMA. Integridad del Contrato y anulabilidad
                </Text>
                <Text style={styles.paragraph_regular}>
                  Este Contrato deja sin efecto todo acuerdo, entendimiento,
                  compromiso y/o negociación que se hubiese desarrollado
                  previamente entre las Partes.
                </Text>
                <Text style={styles.paragraph_regular}>
                  {' '}
                  Asimismo, las Partes reconocen que, en caso de existir,
                  documentos Anexos y/o adjuntos al presente Contrato, estos
                  forman parte o integran el mismo, a todos los efectos legales.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Además, si se diese el caso de que una o varias estipulaciones
                  devinieran ineficaces o fuesen anulables o nulas de pleno
                  derecho, se tendrán por no puestas, manteniendo el resto del
                  Contrato toda su fuerza vinculante entre las Partes. Llegado
                  este caso, las Partes se comprometen, si fuera necesario, a
                  negociar de forma amigable y/o de buena fe un nuevo texto para
                  aquellas estipulaciones o partes del Contrato afectadas.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.content_h5}>
                  VIGESIMOCTAVA. Acciones legales, legislación aplicable y
                  jurisdicción
                </Text>
                <Text style={styles.paragraph_regular}>
                  Las Partes reconocen quedar obligadas por el presente Contrato
                  así como sus correspondientes anexos, si los hubiere, y sus
                  efectos jurídicos y se comprometen a su cumplimiento de buena
                  fe.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Todo litigio relativo, especialmente, pero no solo, a la
                  formación, validez, interpretación, firma, existencia,
                  ejecución o terminación de este Contrato y, en general, a la
                  relación establecida entre las Partes, será sometido a la
                  legislación española.
                </Text>
                <Text style={styles.paragraph_regular}>
                  Así, en caso de controversia, diferencia, conflicto o
                  reclamación en cuanto al Contrato, o en relación al mismo, las
                  Partes acuerdan que se someterán a la jurisdicción de los
                  Juzgados y Tribunales competentes conforme a derecho.
                </Text>
                <Text style={styles.br}></Text>

                <Text style={styles.paragraph_regular}>
                  <Text style={styles.bold_open_sans}>
                    EN VIRTUD DE LO CUAL
                  </Text>{' '}
                  , las Partes reconocen haber leído en su totalidad el
                  Contrato, manifiestan comprenderlo, y aceptan obligarse por
                  sus términos y condiciones, constituyendo el completo y el
                  total acuerdo de las Partes. Y, en prueba de conformidad, las
                  Partes firman el presente Contrato en todas sus hojas, y en
                  tantas copias originales como Partes participen en el
                  Contrato, constituyendo todas esas copias un único acuerdo, en
                  el lugar y fechas indicados en el encabezamiento.
                </Text>

                {/* Signatures */}

                <View wrap={false} style={{ marginTop: 50 }}>
                  <Text style={[styles.bold_open_sans, { marginBottom: 60 }]}>
                    EL PUBLICISTA
                  </Text>
                  <Text style={styles.paragraph_regular}>
                    ..........................................................
                  </Text>
                  <Text style={styles.paragraph_regular}>
                    Ernesto Gerardo De La Cruz Valle
                  </Text>
                  <Text
                    style={[styles.paragraph_regular, { marginBottom: 35 }]}
                  >
                    En representación de CAMPUS CANVAS SL
                  </Text>
                  <Text style={[styles.bold_open_sans, { marginBottom: 60 }]}>
                    EL CLIENTE
                  </Text>
                  <Text style={styles.paragraph_regular}>
                    ..........................................................
                  </Text>
                  <Text style={styles.paragraph_regular}>
                    {contract?.cliente?.nombre}
                  </Text>
                  <Text style={styles.paragraph_regular}>
                    {empresa_representada}
                  </Text>
                </View>

                {/* Footer */}
                <Text
                  fixed
                  style={styles.footer}
                  render={({ pageNumber, totalPages }) => {
                    if (pageNumber === 1) {
                      return ``;
                    }
                    return (
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: 'center',
                        }}
                      >
                        {pageNumber}
                      </Text>
                    );
                  }}
                />
              </Page>
            </Document>
          </PDFViewer>
        </div>
      )}
    </>
  );
};

export default contrato;
