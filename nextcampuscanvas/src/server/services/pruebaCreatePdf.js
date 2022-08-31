const createPublicityContract = (
  contractNumber,
  cliente,
  campana,
  contrato
) => {
  return `
    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8" />
    <title>Contrato - PDF</title>
    <style>
    .cover_container {
      max-width: 800px;
      margin: auto;
      padding: 30px 50px;
      padding-top: 0;
      font-size: 12px;
      line-height: 24px;
      font-family: 'Helvetica Neue', 'Helvetica';
      color: #1e0230;
      background-image: url('https://i.imgur.com/WtLEZxY.png');
      background-repeat: no-repeat;
      background-position: center;
      background-position-y: 20%;
    }
    .cover_title {
      font-size: 50px;
      color: #005ef5;
      line-height: 60px;
      font-weight: bold;
      font-family: 'Poppins', sans-serif;
    }
    .cover_subtitle {
      font-size: 16px;
      font-weight: bold;
      font-family: 'Poppins', sans-serif;
    }
    .information_container {
      margin-top: calc(100% - 70px)
    }
    .contract_number {
      font-weight: bold;
      font-size: 18px;
    }
    .table_information {
      width: 100%;
    }
    .cover_left_information {
      background-color: #e3efff;
      border: 1px solid #1e0230;
      width: fit-content;
      padding: 3px 8px;
    }
    .cover_right_information {
      padding-left: 200px;
    }
    
    .document_content {
      padding: 0 50px;
      max-width: 800px;
      margin: auto;
      font-family: 'Open Sans', sans-serif;
      font-size: 12px;
    }
    .document_content h2 {
      color: #005ef5;
      font-family: 'Poppins', sans-serif;
      font-weight: bold;
      font-size: 18px;
    }
    .document_content h3 {
      font-family: 'Poppins', sans-serif;
      font-weight: bold;
      font-size: 16px;
    }
    .document_content h4 {
      font-family: 'Poppins', sans-serif;
      font-weight: bold;
      font-size: 14px;
    }
    .document_content p,
    li {
      text-align: justify;
    }
    .bleeding_text {
      padding-left: 20px;
    }
    .document_content .text_right {
      text-align: right;
    }
    .document_content .text_center {
      text-align: center;
    }
    .signaures_container {
      height: 600px;
      min-height: 600px;
      margin-top: 100%
    }
    </style>
  </head>
       <body>
        <div id="pageHeader-first"></div>


        <div id="pageFooter-first" style="display: none;"></div>

        <div id="pageFooter" style="color: #1e0230; border-top: 1px solid #ad2146; padding-top: 10px">
        <p style="width: 50%; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; float: left;">{{page}}</p>
        <p style="margin: 0; padding-right: 52px; padding-top: 10px; text-align: right; font-family: sans-serif;">
          <img
            src="https://i.imgur.com/pOdDmpi.png"
            style="max-width: 25%"
            alt="Campus Canvas logo"
          />
        </p>
        </div>

          <div class="cover_container">
          <h1 class="cover_title">CONTRATO DE SERVICIOS DE PUBLICIDAD</h1>
          <h2 class="cover_subtitle">${contrato.periodo}</h2>
          <!-- Imagen de Cover -->
    
          <div class="information_container">
              <p class="contract_number">Número de contrato: <span>${contractNumber}</span></p>
              <table class="table_information" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                    <div class="cover_left_information">
                    <strong>[DESTINATARIO]</strong>
                    </div>
                </td>
                <td class="cover_right_information">
                    <strong> Email: </strong>
                    <br />
                    campuscanvas.info@gmail.com
                </td>
              </tr>
              <tr class="information">
                <td>
                    <div class="cover_left_information">${contrato.fecha_de_creacion}, ${contrato.lugar_de_creacion}</div>
                </td>
                <td class="cover_right_information">
                    <strong>Tel:</strong>
                    611 516 396
                    <br />
                    <strong> www.campuscanvas.net </strong>
                </td>
              </tr>
              </table>
          </div>
        </div>

        <!-- Contract content -->

        <div class="document_content">
          <p class="text_right">En ${contrato.lugar_de_creacion}, a ${contrato.fecha_de_creacion}</p>
          <p class="text_center"><strong>REUNIDOS</strong></p>
          <p><strong>De una parte,</strong></p>
          <p>
            Ernesto Gerardo De La Cruz Valle, mayor de edad, con domicilio en Calle
            de Juan Duque 20, DNI/NIF núm. Y6491644T, y en calidad de
            administrador único, por tanto, actuando, en virtud de escritura pública
            y/o autorización pertinente, en nombre y representación de CAMPUS CANVAS
            SL, con domicilio en Calle de Juan Montalvo 29, CIF/NIF núm. B09762238 e
            inscrita en: Registro Mercantil de Madrid, con los siguientes datos:
            Tomo 42930, Folio 193, hoja M-758914.
          </p>
          <p>En adelante, el <strong>"Publicista."</strong></p>
          <p><strong>De otra parte,</strong></p>
          <p>${cliente.texto_datos}</p>
          <p>En adelante, el <strong>"Cliente"</strong></p>
          <p>
          El Publicista y el Cliente que, en adelante, podrán ser denominados,
          individualmente, la <strong>"Parte"</strong> y conjuntamente, las
          <strong>"Partes"</strong>, reconociéndose mutuamente la capacidad
          jurídica necesaria para contratar y obligarse, y en especial, para el
          otorgamiento del presente CONTRATO DE PUBLICIDAD (en adelante, el
          <strong>"Contrato"</strong>)
          </p>




          <p class="text_center"><strong>EXPONEN</strong></p>
          <p>
            <strong>I. </strong>Que el Publicista está especializado en la
            preparación y realización de las siguientes actividades publicitarias:
          </p>
          <p class="bleeding_text">
            Campañas publicitarias dirigidas a estudiantes universitarios;
          </p>
          <p>
            <strong>II. </strong>Que el Publicista dispone de los conocimientos,
            experiencia y medios materiales y, en su caso, personales, necesarios
            para prestar servicios publicitarios;
          </p>
          <p>
            <strong>III. </strong>Que el Cliente se dedica a la siguiente actividad:
          </p>
          <p>${cliente.actividad}</p>
          <p>
            <strong>IV. </strong>Que el Cliente desea contar con los servicios
            publicitarios del Publicista para realizar la promoción de:
          </p>
          <p>${campana.producto_a_promover}</p>
          <p>
            <strong>V. </strong>Que, con el fin de llegar a un acuerdo, las Partes
            han negociado y aceptado un presupuesto y una propuesta de objetivos y
            actividades que deberá incluir la campaña publicitaria;
          </p>
          <p>
            <strong>VI. </strong>Que, en virtud de lo anterior, el Publicista desea,
            libre y espontáneamente, comprometerse a la prestación de los servicios
            publicitarios solicitados por el Cliente, circunstancia que las Partes
            desean formalizar a través del presente Contrato, que se regirá por las
            siguientes
          </p>
          <p class="text_center"><strong>ESTIPULACIONES</strong></p>
          <p><strong>PRIMERA. Objeto del Contrato</strong></p>
          <p>
            El objeto del presente Contrato consiste en la realización, por parte
            del Publicista, de las siguientes actividades publicitarias:
          </p>
          <p class="bleeding_text">
            Recogida (de ser solicitada), preparación y distribución de productos
            y/o folletos enviados por correo postal a estudiantes universitarios a
            través del servicio de cajas publicitarias "Campus Box".
          </p>
          <p>En adelante, la <strong>"Campaña publicitaria"</strong></p>
          <p>
            El Publicista realizará la Campaña de publicidad con total autonomía e
            independencia respecto del Cliente, en atención a su grado de
            especialización y conforme a los usos y costumbres de su sector de
            actividad.
          </p>

        


          <p>
          Por último, el desarrollo de la Campaña de publicidad se ceñirá a lo
          establecido en las estipulaciones de este Contrato, a lo dispuesto en la
          Ley 34/1988, de 11 de noviembre, General de Publicidad, así como a lo
          recogido en Código Civil español, y a la restante legislación aplicable.
          </p>
          <br>
          <p>
            <strong
              >SEGUNDA. Modificaciones o ampliaciones del objeto del
              Contrato</strong
            >
          </p>
          <p>
            Si durante la vigencia del presente Contrato, el Cliente y/o el
            Publicista consideran oportuno modificar y/o ampliar la Campaña
            publicitaria, ambas Partes deberán negociar el alcance de dichas
            modificaciones o ampliaciones.
          </p>
          <p>
            Los acuerdos adoptados en la negociación deberán constar por escrito, y
            quedarán incorporados como anexos al presente Contrato. En el caso que
            ambas Partes no se pusieran de acuerdo sobre dichas modificaciones o
            ampliaciones, cualquiera de las Partes podrá resolver el presente
            Contrato.
          </p>
          <p>
            En su caso, si el Cliente o el Publicista considera oportuno modificar o
            alterar la Campaña publicitaria, este deberá notificar a la otra Parte
            con el fin de negociar y/o acordar el nuevo precio de la misma.
          </p>
          <p>
            La ampliación de la Campaña publicitaria o la prestación de cualquier
            servicio adicional o complementario solicitado por el Cliente se regirá
            por las estipulaciones de este Contrato.
          </p>
          <br>
          <p>
            <strong>TERCERA. Características de la Campaña publicitaria</strong>
          </p>
          <p>
            La Campaña publicitaria se realizará por el Publicista atendiendo a las
            siguientes instrucciones del Cliente:
          </p>
          <p>${campana.texto_datos_campana}</p>
          <p>
            Estas características serán, a su vez, necesariamente determinantes del
            alcance, la forma y el contenido de la Campaña publicitaria.
          </p>



          <br />
          <p>
            <strong>CUARTA. Público objetivo de la Campaña publicitaria</strong>
          </p>
          <p>
            El público objetivo al cual se dirigirá la Campaña publicitaria será el
            siguiente:
          </p>
          <p class="bleeding_text">
            El publicista, mediante doble verificación a través de software,
            garantiza que el producto solamente será enviado al perfil anteriormente
            mencionado: estudiantes universitarios inscritos en alguna de las
            universidades en España peninsular.
          </p>
          <p>
            La forma y el contenido de la Campaña publicitaria deberá diseñarse y
            adaptarse de tal manera que permita acceder de la mejor forma posible al
            público objetivo aquí señalado.
          </p>
          <br />
          <p>
            <strong>QUINTA. Obligaciones del Publicista</strong>
          </p>
          <p>
            El Publicista se compromete a preparar y ejecutar la Campaña
            publicitaria de forma diligente y conforme a los usos y costumbres
            profesionales propios de su sector de actividad.
          </p>
          <p>
            Igualmente, el Publicista se compromete a realizar la Campaña
            publicitaria dentro de las fechas y/o plazos e instrucciones acordados
            con el Cliente.
          </p>
          <p>
            Además, el Publicista reconoce haber informado al Cliente, previamente a
            la firma de este Contrato, sobre las características esenciales de la
            Campaña publicitaria y/o todas las informaciones sobre cómo y/o en qué
            condiciones se prestan o realizan, además de toda otra información
            precontractual que fuese necesaria.
          </p>
          <br />
          <p>
            <strong>SEXTA. Obligaciones del Cliente</strong>
          </p>
          <p>
            El Cliente se compromete a informar o hacer entrega de toda la
            información útil y/o relevante y veraz para la correcta ejecución de la
            Campaña publicitaria. Especialmente, aquellos datos o informaciones
            relativos a sus necesidades particulares y que contribuirían a una
            óptima ejecución de la Campaña publicitaria por parte del Publicista.
          </p>
          <p>
            Asimismo, el Cliente se compromete a colaborar con el Publicista durante
            el desarrollo de la Campaña publicitaria, no oponiendo impedimentos a la
            preparación y ejecución de la misma.
          </p>
          <p>
            Por último, el Cliente se obliga a pagar el precio tal y como resulta
            del presente Contrato.
          </p>
          <br />
          <p>
            <strong>SÉPTIMA. Plazo de ejecución y/o entrega</strong>
          </p>
          <p>
            El Contrato entrará en vigor en la fecha señalada en el encabezado del
            presente Contrato. El Publicista deberá llevar a cabo el diseño y
            ejecución de la Campaña publicitaria siguiendo los plazos establecidos a
            continuación:
          </p>
          <p class="bleeding_text">
            <strong>I. </strong>${contrato.fecha_inicio}, se deberá completar lo
            siguiente:
          </p>
          <p class="bleeding_text">
            Se dará inicio, de haber sido solicitada, la recogida y posterior
            preparación del producto/folleto a distribuir. Dependiendo del volumen y
            cantidad del producto, la recogida se efectuará en una o varias visitas
            al lugar de recogida a lo largo del período de distribución. A través de
            medios publicitarios online/offline, se dará a conocer a los estudiantes
            de la disponibilidad de dichas cajas, incitándoles a su adquisición a
            través de pedido por correo postal o recogida en persona. Ambas opciones
            serán gestionables a través de la aplicación web del publicista:
            www.campuscanvas.net
          </p>
          <p class="bleeding_text">
            <strong>II. </strong>${contrato.fecha_fin}, se deberá completar lo
            siguiente:
          </p>
          <p class="bleeding_text">
            El plazo para adquirir las cajas por los estudiantes finaliza. En el
            supuesto de no haber completado el cien por ciento de la cantidad a
            distribuir acordada debido a una demanda por debajo de lo estimado por
            parte de los estudiantes, se optará por lo siguiente, según el cliente
            vea conveniente:
          </p>
          <ul>
            <li>
              Se podrá llegar a un acuerdo en el que el publicista se comprometa a
              continuar con la distribución del producto/folletos durante el
              semestre próximo respecto al semestre para el cual se pactó la
              distribución inicialmente.
            </li>
            <li>
              El publicista hará devolución al cliente del producto/folletos
              remanentes, así como del importe monetario, en caso de haberlo pagado,
              proporcional a la cantidad de productos/folletos que no se lograron
              distribuir en el tiempo estipulado.
            </li>
          </ul>
          <p>
            En todo caso, siguiendo lo dispuesto en la Estipulación anterior, el
            Cliente se compromete a colaborar y a aportar toda la información
            necesaria que le sea requerida por el Publicista para poder preparar la
            Campaña publicitaria de acuerdo a los plazos establecidos en esta
            Estipulación. En el caso de que el Cliente no facilite esta información
            o no preste su colaboración de forma adecuada, el Publicista podrá
            comunicar por escrito al Cliente su imposibilidad de cumplir con los
            plazos establecidos en esta Estipulación.
          </p>




          <br />
          <p>
            <strong>OCTAVA. Seguimiento de la ejecución del Contrato</strong>
          </p>
          <p>
            El Publicista se compromete, a fin de facilitar el seguimiento de la
            ejecución del Contrato, a remitir periódicamente al Cliente información
            y/o documentación sobre el estado de las actividades relacionadas con la
            Campaña publicitaria.
          </p>
          <p>
            No obstante, el Cliente se reserva la facultad de exigir al Publicista
            otra información o documentación adicional que pudiera necesitar para
            poder realizar un correcto seguimiento de la ejecución de la Campaña
            publicitaria y, en su caso, que le pueda corresponder según normativa
            aplicable correspondiente.
          </p>
          <br />
          <p>
            <strong>NOVENA. Duración del Contrato</strong>
          </p>
          <p>
            La Campaña publicitaria se extenderá durante un período comprendido
            entre el ${contrato.fecha_inicio}, fecha de entrada en vigor del Contrato, y el
            ${contrato.fecha_fin}, fecha en la que termina el Contrato.
          </p>
          <br />
          <p>
            <strong>DÉCIMA. Precio y forma de pago</strong>
          </p>
          <p>
            Las Partes acuerdan el pago de una cantidad ascendiente a
            ${contrato.precio_letras} (${contrato.precio} €) como remuneración de la ejecución de la
            Campaña publicitaria, sin incluir los impuestos que pudieran derivar de
            esta operación.
          </p>
          <div>[OPCION DE PAGO]</div>
          <p>Entidad bancaria: Banco Bilbao Vizcaya Argentaria (BBVA)</p>
          <p>IBAN: ES78 0182 1275 1202 0210 1647</p>
          <p>
            Por último, el Publicista emitirá una factura al Cliente cumpliendo con
            los requisitos legales necesarios y dentro de los plazos previstos en la
            legislación actual.
          </p>




          <br />
          <p>
            <strong>DECIMOPRIMERA. Intereses de demora</strong>
          </p>
          <p>
            Siguiendo lo recogido en el artículo 1.101 del Código Civil, cualquier
            retraso en el pago de la remuneración establecida en el presente
            Contrato dará lugar a un incremento del precio equivalente a los
            intereses de demora generados por el retraso en el pago.
          </p>
          <p>
            El tipo de interés de demora será igual al tipo de interés de referencia
            o de refinanciación semestral del Banco Central Europeo en vigor a 1 de
            enero para el primer semestre del año correspondiente, y a 1 de julio
            para el segundo semestre del año correspondiente.
          </p>
          <p>
            Los intereses de demora serán exigibles automáticamente a partir de la
            fecha de pago fijada en la Estipulación anterior, sin necesidad alguna
            de aviso del vencimiento ni intimación alguna por parte del Publicista.
            El devengo de dichos intereses no afectará al ejercicio de cualquier
            acción que pueda corresponderle al Publicista derivada del
            incumplimiento del pago.
          </p>
          <br />
          <p>
            <strong
              >DECIMOSEGUNDA. Recursos y/o materiales para la preparación de la
              Campaña publicitaria</strong
            >
          </p>
          <p>
            El Publicista utilizará, para la realización o ejecución de la Campaña
            publicitaria, los medios materiales adecuados y, en su caso, su propio
            personal, quienes realizarán sus funciones utilizando los materiales más
            adecuados, y siguiendo las instrucciones emitidas por el Publicista en
            consonancia con las obligaciones que asume por el presente Contrato
            frente al Cliente. El Publicista se compromete, igualmente, a que dicho
            personal encargado de la preparación de la Campaña publicitaria conozca
            las necesidades particulares del Cliente.
          </p>
          <p>
            En especial, el Publicista se compromete a que las personas o empleados
            que pudieran quedar adscritas a la preparación y ejecución de la Campaña
            publicitaria tengan la cualificación y experiencia adecuadas para la
            realización de los trabajos convenidos. Y, asimismo, deberán conocer el
            contenido de las estipulaciones relativas a propiedad intelectual,
            confidencialidad, y al tratamiento de los datos de carácter personal que
            se establecen en el Contrato, así como su obligación personal de
            respetarlos.
          </p>
          <br />
          <p>
            <strong>DECIMOTERCERA. Gastos</strong>
          </p>
          <p>
            El Publicista se hará cargo de todos los gastos relacionados con la
            preparación de la Campaña publicitaria. Deberá hacerse cargo del pago de
            los medios e instrumentos necesarios para poder ejecutar el Contrato
            correctamente, así como de todos los impuestos o tasas que se devenguen
            en relación con la Campaña publicitaria, quedando el Cliente
            completamente indemne del pago de todos estos gastos.
          </p>
          <br />
          <p>
            <strong>DECIMOCUARTA. Inexistencia de relación laboral</strong>
          </p>
          <p>
            La relación entre las Partes tiene, exclusivamente, carácter mercantil,
            no existiendo vínculo laboral alguno entre el Publicista y el Cliente,
            o, en su caso, el personal de aquel.
          </p>
          <p>
            En este último supuesto, dicho personal no podrá considerarse, basándose
            en la existencia de este Contrato o de su cumplimiento, ni de hecho ni
            de derecho, como un empleado del Cliente y, por ello, dependerá a todos
            los efectos, incluidos los aspectos laborales y de Seguridad Social,
            única y exclusivamente de la dirección del Publicista.
          </p>
          <p>
            El Publicista, asimismo, reconoce que el personal que pudiera colaborar
            en la preparación de la Campaña publicitaria estará contratado conforme
            a la Ley y asume cuantas obligaciones se deriven de la legislación
            social y, en especial, de las disposiciones vigentes en materia de
            Seguridad Social, Seguridad e Higiene en el Trabajo y prevención de
            riesgos laborales, eximiendo al Cliente de cualquier responsabilidad que
            se pudiera derivar como consecuencia de su incumplimiento.
          </p>
          <p>
            El Cliente, igualmente, renunciará expresamente a contratar,
            directamente o a través de terceros, a ningún empleado del Publicista
            mientras no finalice, al menos, el presente Contrato.
          </p>
          <p>
            En todo caso, el Cliente podrá requerir al Publicista que le facilite
            una copia de la documentación justificativa de encontrarse al corriente
            de las obligaciones laborales y tributarias con la Administración o con
            cualquier tercero jurídicamente obligatorio.
          </p>




          <br />
          <p>
            <strong>DECIMOQUINTA. Cumplimiento normativa aplicable</strong>
          </p>
          <p>
            El Publicista se compromete a ejecutar la Campaña publicitaria
            cumpliendo de forma diligente con toda la normativa aplicable y, en
            particular, con todas las obligaciones laborales, de la Seguridad
            Social, fiscales, sobre la competencia desleal y de protección de datos
            que le sean aplicables en relación con la preparación de la Campaña
            publicitaria.
          </p>
          <br />
          <p>
            <strong>DECIMOSEXTA. Responsabilidad</strong>
          </p>
          <p>
            Incurrirá en responsabilidad cualquiera de las Partes que actúe de forma
            negligente o culposa en el cumplimiento de las obligaciones establecidas
            en el presente Contrato y ocasionare con ello un daño o perjuicio a la
            otra Parte. La Parte que tenga que afrontar cualquier tipo de daño o
            perjuicio en virtud de la actuación de la otra Parte podrá reclamar una
            indemnización por los daños y perjuicios ocasionados.
          </p>
          <p>
            El Publicista realizará la preparación de la Campaña publicitaria con la
            diligencia y calidad debida, comprometiéndose a asumir la
            responsabilidad por los errores, defectos o demoras producidas en su
            ejecución, o por su incorrecta o falta de ejecución. No obstante, el
            Publicista no será responsable de los errores, defectos o demoras
            producidas en la ejecución, o la incorrecta ejecución o de la no
            ejecución del Contrato, cuando esto emane de la omisión o falseamiento
            de cualquier información, documento o dato facilitado por el Cliente; el
            Publicista tampoco estará obligado a verificar la autenticidad y
            exactitud de dichos datos o informaciones.
          </p>
          <br />
          <p>
            <strong>DECIMOSÉPTIMA. Elevación a público del Contrato</strong>
          </p>
          <p>
            Cualquiera de las Partes podrá solicitar, mediante requerimiento
            fehaciente, la elevación a público del presente Contrato.
          </p>
          <p>
            En ese caso, las Partes elegirán por mutuo acuerdo el Notario o Notaria
            Público ante el cual se otorgará la escritura pública y la parte
            solicitante se hará cargo de los correspondientes gastos notariales.
          </p>
          <br />
          <p>
            <strong>DECIMOCTAVA. Fuerza mayor</strong>
          </p>
          <p>
            Ninguna de las Partes podrá ser considerada como responsable de un
            retraso, defecto o error en la ejecución de sus obligaciones
            contractuales cuando aquellos son debidos u ocasionados por una causa de
            fuerza mayor. No obstante, las Partes quedan obligadas a notificar a la
            otra Parte cuando tengan conocimiento de que una causa de esta
            naturaleza ha ocurrido y afectará a la correcta ejecución de sus
            obligaciones.
          </p>
          <p>
            Se entenderá por "fuerza mayor": inundación, incendio, explosión, avería
            en la planta de producción, cierre patronal, huelga, disturbio civil,
            bloqueo, embargo, mandato, ley, orden, regulación, ordenanza, demanda o
            petición de cualquier Gobierno o de cualquier subdivisión o
            representante de este, o cualquier otra causa, que esté fuera del
            control de la Parte involucrada, sin que pueda entenderse que la falta
            de fondos constituye una causa de fuerza mayor.
          </p>
          <br />
          <p>
            <strong>DECIMONOVENA. Obligación de secreto y confidencialidad</strong>
          </p>
          <p>
            Las Partes reconocen que toda la información a la que se pueda tener
            acceso en el marco del Contrato, ya sea relacionada con la preparación
            de la Campaña publicitaria o relacionada con la actividad u organización
            de alguna de las Partes (en adelante, la
            <strong>"Información"</strong>), tiene carácter confidencial. De esta
            forma, las Partes acuerdan no divulgarla y mantener la más estricta
            confidencialidad respecto de dicha Información, advirtiendo, en su caso,
            de dicho deber de confidencialidad y secreto a sus empleados, asociados
            y a cualquier persona que, por su cargo o relación personal o
            sentimental deba o pueda tener acceso a la misma.
          </p>
          <p>
            Ninguna de las Partes podrá reproducir, modificar, hacer pública o
            divulgar a terceros la Información sin previa autorización escrita y
            expresa de la otra Parte.
          </p>
          <p>
            Las Partes se comprometen a poner los medios necesarios para que la
            Información no sea divulgada ni cedida. Adoptarán las mismas medidas de
            seguridad que adoptarían respecto a la información confidencial de su
            propiedad, evitando su pérdida, robo o sustracción.
          </p>
          <p>
            El receptor de la Información se compromete, en su caso, a advertir
            sobre la existencia del deber de confidencialidad a sus empleados,
            asociados, y a toda persona a la cual se le facilite la Información,
            haciéndose responsable del uso indebido que estos puedan hacer de la
            Información relacionada con el Contrato.
          </p>
          <p>
            Asimismo, la Parte que recibe la Información se compromete a poner en
            conocimiento de la otra Parte cualquier acción o incidente por parte de
            terceros que pueda atentar contra la confidencialidad de la Información.
          </p>
          <p>
            Ambas Partes se comprometen a que la utilización de la Información solo
            estará dirigida a alcanzar los objetivos del Contrato y no otros, y que,
            así, solo estará en conocimiento de aquellas personas estrictamente
            necesarias para cumplir con aquellos.
          </p>
          <p>
            Las disposiciones relativas a la confidencialidad previstas en este
            Contrato se aplicarán durante la vigencia del mismo y prevalecerán
            durante el siguiente período: 36 meses tras su terminación. Este plazo
            de tiempo es inmediato a la terminación del Contrato.
          </p>



          <br />
          <p>
            <strong>VIGÉSIMA. Protección de datos</strong>
          </p>
          <p>
            Las Partes de este Contrato conocen y se obligan a cumplir el Reglamento
            (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de
            2016, relativo a la protección de las personas físicas en lo que
            respecta al tratamiento de datos personales y a la libre circulación de
            estos datos (RGPD), así como la Ley Orgánica 3/2018, de Protección de
            Datos Personales y garantía de los derechos digitales y su normativa de
            desarrollo, y/o aquellas que las pudieran sustituir o actualizar en el
            futuro.
          </p>
          <p>
            De esta forma, las Partes son conscientes de que mediante la firma de
            este Contrato consienten que sus datos personales recogidos en el
            presente Contrato, así como aquellos que se pudiesen recoger en el
            futuro para poder dar cumplimiento o una correcta ejecución de este
            mismo, podrán ser incorporados por la otra Parte a su propio fichero,
            automatizado o no, de recogida de datos con el fin de ejecutar
            correctamente la relación contractual y, eventualmente, para una gestión
            administrativa y/o comercial.
          </p>
          <p>
            En todo caso, las Partes se comprometen a que estos datos personales no
            sean comunicados en ningún caso a terceros, aunque, si se diese el caso
            de que fuera a realizarse algún tipo de comunicación de datos
            personales, se comprometen siempre y de forma previa, a solicitar el
            consentimiento expreso, informado, e inequívoco de la Parte que es
            titular de dichos datos de carácter personal, indicando la finalidad
            concreta para la que se realizará la comunicación de los datos.
          </p>
          <p>
            De esta Estipulación no resulta ninguna limitación o restricción para
            las Partes en cuanto al ejercicio de los derechos de acceso,
            rectificación, supresión, limitación del tratamiento, portabilidad u
            oposición con los que pudieran contar.
          </p>
          <p>
            Respecto de los datos personales a los que el Publicista tenga acceso
            como consecuencia de la ejecución de la Campaña publicitaria, estos son
            propiedad exclusiva del Cliente y se entenderán facilitados de forma
            voluntaria por este, y sólo serán utilizados con la finalidad de
            preparar la Campaña publicitaria, comprometiéndose el Publicista a no
            aplicarlos ni utilizarlos para finalidad distinta de la pactada y a no
            comunicarlos a otras personas, ni siquiera a efectos de conservación.
            Asimismo, se obliga a devolver íntegramente al Cliente los ficheros,
            automatizados o no, de datos de carácter personal a los que hubiera
            tenido acceso, cuando sea requerido a ello por el Cliente, y/o a
            proceder a la destrucción de los soportes y/o documentos donde se
            contengan dichos datos al finalizar el presente Contrato, y, en todo
            caso, al vencimiento del presente Contrato.
          </p>
          <p>
            En todo caso, el Publicista se compromete a que el tratamiento de los
            datos de carácter personal a los que tenga acceso por razón de la
            preparación y ejecución de la Campaña publicitaria, y de cuanta
            información en general le sea facilitada por el Cliente, sea realizado
            manteniendo el más estricto secreto profesional y absoluta
            confidencialidad respecto de los datos de los mismos, así como a cumplir
            diligentemente el deber de guardia y custodia que sobre los mismos
            impone el RGPD y la LOPD.
          </p>
          <p>
            Estos deberes serán exigibles al Publicista durante la vigencia del
            presente Contrato y aún después de producida la terminación por
            cualquier causa del mismo, siendo responsable frente al Cliente del
            incumplimiento de las obligaciones aquí asumidas.Estos deberes serán
            exigibles al Publicista durante la vigencia del presente Contrato y aún
            después de producida la terminación por cualquier causa del mismo,
            siendo responsable frente al Cliente del incumplimiento de las
            obligaciones aquí asumidas.
          </p>
          <p>
            Asimismo, el Publicista se compromete a adoptar las medidas técnicas y/u
            organizativas necesarias para proteger los datos de carácter personal a
            los que tenga acceso y a evitar su alteración, pérdida, tratamiento y
            acceso no autorizado, y ello en consonancia con el RGPD, la LOPD y sus
            normas complementarias de desarrollo.
          </p>
          <p>
            El Publicista responderá frente al Cliente del incumplimiento de las
            obligaciones asumidas en virtud de esta Estipulación, incluso cuando
            dicho incumplimiento sea imputable, en su caso, al personal del cual
            deberá responder legalmente.
          </p>




          <br />
          <p>
            <strong>VIGESIMOPRIMERA. Propiedad intelectual e industrial</strong>
          </p>
          <p>
            Por medio de este Contrato, el Publicista renuncia expresa y formalmente
            a cuantos derechos de propiedad intelectual o industrial pudieran
            generarse como consecuencia de la ejecución de la Campaña publicitaria,
            cuya titularidad corresponderá únicamente al Cliente.
          </p>
          <p>
            Por otro lado, el Cliente renuncia, de forma expresa, a cuantos derechos
            de propiedad intelectual o industrial sean aportados por el Publicista
            para la preparación y desarrollo de la Campaña publicitaria, manteniendo
            en todo momento el Publicista su titularidad.
          </p>
          <p>
            No obstante, en el caso de que el Cliente estuviera interesado en la
            utilización como parte de la ejecución de este Contrato de los derechos
            de explotación de obras preexistentes protegidas por derechos de
            propiedad intelectual o industrial propiedad del Publicista, se
            negociaría su uso expresamente, y caso por caso, entre ambas Partes. El
            Publicista informaría previamente al Cliente de forma clara y concisa
            sobre las condiciones de adquisición y/o explotación, para que este
            pueda decidir libremente sobre los mismos.
          </p>
          <br />
          <p>
            <strong>VIGESIMOSEGUNDA. Cesión del Contrato. Subcontratación</strong>
          </p>
          <p>
            Las Partes no podrán ceder su posición en el presente Contrato, ni
            tampoco los derechos u obligaciones que de este mismo emanasen a su
            favor o a su cargo, sin el consentimiento previo, expreso y por escrito
            de la otra Parte.
          </p>
          <p>
            En particular esta Estipulación regirá de forma que el Publicista se
            compromete a comunicar al Cliente, por escrito y previamente a la
            celebración de un acuerdo de subcontratación, su intención de contratar
            a una parte subcontratista, la identidad de la misma, el tipo de
            servicios y trabajos a realizar por esta y las condiciones económicas y
            legales de la relación de subcontratación. Todo ello, en orden de
            facilitar que el Cliente pueda aprobar dicha subcontratación, sin que
            dicha autorización suponga la asunción de responsabilidad alguna por
            parte del Cliente o la aprobación del resultado de los servicios y
            trabajos que la parte subcontatista provea.
          </p>
          <p>
            Igualmente, será responsabilidad del Publicista comprobar que la parte
            subcontratista está autorizada para la prestación de los servicios
            publicitarios o actividades objeto de subcontratación, así como para
            regular por escrito la relación contractual con la misma, incorporando o
            anexando los acuerdos establecidos en el presente Contrato. Además, el
            Publicista se obliga a entregar al Cliente una copia de dicho contrato
            en los 5 (cinco) días siguientes a su firma.
          </p>
          <p>
            La parte subcontratista actuaría en todo momento bajo la dirección y
            control del Publicista, quien se obliga y responsabiliza a hacer cumplir
            a la parte subcontratista con todas las obligaciones asumidas en el
            presente Contrato.
          </p>
          <p>
            El Publicista responderá solidariamente de las obligaciones que asuma la
            parte subcontratista, incluso cuando el Cliente hubiera autorizado dicha
            subcontratación, incluyendo los daños y perjuicios que pudiese sufrir
            directa o indirectamente por la actuación de dicha parte subcontratista.
            Del mismo modo, cualquier acto, error o negligencia en el cumplimiento
            de las obligaciones laborales o de Seguridad Social de la parte
            subcontratista, de sus representantes, o trabajadores, no serán, en
            ningún caso, responsabilidad del Cliente.
          </p>
          <p>
            El incumplimiento de esta Estipulación por el Publicista será motivo
            suficiente para resolver el presente Contrato.
          </p>



          <br />
          <p>
            <strong>VIGESIMOTERCERA. Inexistencia de renuncia</strong>
          </p>
          <p>
            La renuncia de una de las Partes a exigir el cumplimiento de alguna de
            las obligaciones previstas en el Contrato, o a ejercer alguno de los
            derechos o acciones que le asisten en virtud del mismo,
            <strong>(a)</strong> no liberará a la otra Parte del cumplimiento
            íntegro de las restantes obligaciones contenidas en el Contrato; y,
            <strong>(b)</strong> no se entenderá como una renuncia a exigir en un
            futuro el cumplimiento de cualquier obligación o a ejercer derechos o
            acciones previstos en el Contrato.
          </p>
          <p>
            La dispensa, aplazamiento o renuncia de alguno de los derechos
            contemplados en el Contrato, o a una parte de los mismos, será
            únicamente vinculante si consta por escrito, pudiendo quedar sujeta a
            las condiciones que el otorgante de dicha dispensa, aplazamiento o
            renuncia considere oportunas, limitándose al caso concreto en el que se
            produjo, y no restringirá, en ningún caso, la exigibilidad en otros
            supuestos del derecho al que afecta.
          </p>
          <br />
          <p>
            <strong>VIGESIMOCUARTA. Causas de resolución</strong>
          </p>
          <p>
            Las Partes se comprometen a cumplir las obligaciones que emanan de este
            Contrato para cada una de ellas en los términos y condiciones
            establecidos a lo largo del mismo.
          </p>
          <p>
            En el supuesto de que alguna de las Partes incumpliera alguna de las
            obligaciones del Contrato, o las cumpliera de forma defectuosa, la Parte
            que a su vez sí hubiera cumplido con las suyas podrá considerar que ha
            existido incumplimiento del contrato en los términos establecidos por el
            artículo 1.124 del Código Civil, quedando facultada para optar entre
            resolver el Contrato o exigir su cumplimiento, reclamando, en ambos
            casos, la correspondiente indemnización de daños y perjuicios.
          </p>
          <p>
            Además, el Contrato se considerará resuelto por la insolvencia
            definitiva o provisional, la suspensión de pagos, la quiebra, el
            concurso de acreedores, y/o el acuerdo de liquidación de cualquiera de
            las Partes.
          </p>
          <p>
            También será causa de resolución anticipada del Contrato las situaciones
            en las que existan deficiencias recurrentes en la Campaña publicitaria
            diseñada y ejecutada por el Publicista y/o no fueran conforme a las
            instrucciones u objetivos establecidos en este Contrato.
          </p>
          <p>
            Igualmente, será causa de resolución del Contrato cuando el Publicista
            deje de ejecutar la Campaña publicitaria o parte de la Campaña
            publicitaria que forma parte del objeto de este Contrato. Se entenderá
            que el Publicista ha dejado de ejecutar la Campaña publicitaria cuando
            no se desarrolla dicha actividad regularmente o con los medios
            materiales y personales adecuados o necesarios.
          </p>
          <p>
            Cuando el Publicista sea una persona física, el Contrato también será
            resuelto por causa de su fallecimiento, incapacidad o cualquier otra
            causa que le imposibilite cumplir con la ejecución del Contrato con la
            calidad y continuidad a que se compromete en virtud del mismo, con
            independencia de cualquier otro incumplimiento contractual que pudiera
            producirse.
          </p>
          <p>
            La falta de pago de la ejecución de la Campaña publicitaria por parte
            del Cliente dará derecho al Publicista a rescindir el Contrato y, si lo
            estimara oportuno, a proceder a su reclamación conforme a la Ley.
          </p>
          <p>
            Asimismo, se podrá resolver el Contrato por voluntad de cualquiera de
            las Partes, siempre que la Parte que así lo desee notifique su voluntad
            a la otra Parte por escrito y conforme al procedimiento de notificación
            establecido en este Contrato con una antelación mínima de 15 días.
          </p>
          <p>
            En este último supuesto, cuando se resuelva el Contrato por voluntad del
            Cliente, este deberá, no obstante, abonar al Publicista toda factura
            devengada y no pagada relacionada con la Campaña publicitaria durante el
            tiempo que el Contrato ha estado en vigor, así como una posible
            indemnización por daños y perjuicios si ejercita su voluntad sin
            respetar el preaviso y método de notificación aquí establecido.
            Igualmente, cuando se resuelva el Contrato por voluntad del Publicista,
            este deberá facilitar al Cliente todo documento, elemento, bien,
            material, y/o producción que hubiese podido resultar de su actividad de
            publicitaria hasta ese momento, además de una posible indemnización por
            daños y perjuicios que pudiera mediar si ejercita su voluntad sin
            respetar el preaviso y método de notificación aquí previsto.
          </p>




          <br />
          <p>
            <strong
              >VIGESIMOQUINTA. Falta de adaptación de la publicidad a los requisitos
              del Cliente</strong
            >
          </p>
          <p>
            En el caso de que la Campaña publicitaria no se ajuste en sus elementos
            esenciales a los términos establecidos en este Contrato o a las
            instrucciones expresadas en la Estipulación Tercera, así como las
            comunicadas durante la ejecución de la Campaña publicitaria, este podrá
            exigir una rebaja de la contraprestación o la repetición total o parcial
            de la publicidad en los términos pactados, y la indemnización, en uno y
            otro caso, de los perjuicios que se le hubieren irrogado. En caso de que
            el incumplimiento sea notable, será de aplicación lo dispuesto en la
            Estipulación anterior.
          </p>
          <br />
          <p>
            <strong>VIGESIMOSEXTA. Notificaciones</strong>
          </p>
          <p>
            Para realizar cualquier notificación entre las Partes que tenga como
            origen el presente Contrato, estas acuerdan que su domicilio a efectos
            de las mismas sean las direcciones indicadas al principio de este
            Contrato. Para que una notificación entre las Partes sea efectuada de
            forma válida, deberá realizarse por un medio fehaciente que deje
            constancia del momento en que ha sido enviada, a qué dirección ha sido
            enviada y el momento de su recepción por la otra Parte. Cuando se
            produjera un cambio en el domicilio a efectos de notificaciones, se
            deberá comunicar esta nueva información, lo más pronto posible, a la
            otra Parte siguiendo el procedimiento aquí establecido.
          </p>
          <p>
            No obstante, siempre y cuando sea posible garantizar la autenticidad del
            emisor, del destinatario, y del contenido del mensaje, y con el objetivo
            de mantener una comunicación fluida entre las Partes, se facilitan las
            siguientes direcciones de correo electrónico:
          </p>
          <p>EL PUBLICISTA:</p>
          <p class="bleeding_text">campuscanvas.info@gmail.com</p>
          <p>El CLIENTE:</p>
          <p class="bleeding_text">${cliente.correo}</p>
          <br />
          <p>
            <strong>VIGESIMOSÉPTIMA. Integridad del Contrato y anulabilidad</strong>
          </p>
          <p>
            Este Contrato deja sin efecto todo acuerdo, entendimiento, compromiso
            y/o negociación que se hubiese desarrollado previamente entre las
            Partes.
          </p>
          <p>
            Asimismo, las Partes reconocen que, en caso de existir, documentos
            Anexos y/o adjuntos al presente Contrato, estos forman parte o integran
            el mismo, a todos los efectos legales.
          </p>
          <p>
            Además, si se diese el caso de que una o varias estipulaciones
            devinieran ineficaces o fuesen anulables o nulas de pleno derecho, se
            tendrán por no puestas, manteniendo el resto del Contrato toda su fuerza
            vinculante entre las Partes. Llegado este caso, las Partes se
            comprometen, si fuera necesario, a negociar de forma amigable y/o de
            buena fe un nuevo texto para aquellas estipulaciones o partes del
            Contrato afectadas.
          </p>
          <br />
          <p>
            <strong
              >VIGESIMOCTAVA. Acciones legales, legislación aplicable y
              jurisdicción</strong
            >
          </p>
          <p>
            Las Partes reconocen quedar obligadas por el presente Contrato así como
            sus correspondientes anexos, si los hubiere, y sus efectos jurídicos y
            se comprometen a su cumplimiento de buena fe.
          </p>
          <p>
            Todo litigio relativo, especialmente, pero no solo, a la formación,
            validez, interpretación, firma, existencia, ejecución o terminación de
            este Contrato y, en general, a la relación establecida entre las Partes,
            será sometido a la legislación española.
          </p>
          <p>
            Así, en caso de controversia, diferencia, conflicto o reclamación en
            cuanto al Contrato, o en relación al mismo, las Partes acuerdan que se
            someterán a la jurisdicción de los Juzgados y Tribunales competentes
            conforme a derecho.
          </p>
          <p>
            <strong>EN VIRTUD DE LO CUAL</strong>, las Partes reconocen haber leído
            en su totalidad el Contrato, manifiestan comprenderlo, y aceptan
            obligarse por sus términos y condiciones, constituyendo el completo y el
            total acuerdo de las Partes. Y, en prueba de conformidad, las Partes
            firman el presente Contrato en todas sus hojas, y en tantas copias
            originales como Partes participen en el Contrato, constituyendo todas
            esas copias un único acuerdo, en el lugar y fechas indicados en el
            encabezamiento.
          </p>




          <div class="signaures_container">
          <br />
          <p><strong>EL PUBLICISTA</strong></p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>..........................................</p>
          <p>Ernesto Gerardo De La Cruz Valle</p>
          <p>En representación de CAMPUS CANVAS SL</p>
          <br />
          <br />
          <p><strong>EL CLIENTE</strong></p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>..........................................</p>
          <p>${cliente.nombre}</p>
          [EMPRESA REPRESENTADA]
        </div>
        </div>
       </body>
    </html>
    `;
};

module.exports = {
  createPublicityContract,
};
