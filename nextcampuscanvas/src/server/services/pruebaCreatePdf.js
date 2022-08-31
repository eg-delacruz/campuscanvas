const pruebaCreatePdf = () => {
  return `
    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8" />
    <title>Contrato - PDF</title>
    <style>
    
    </style>
  </head>
       <body>
          <div class="cover_container">
          <h1 class="cover_title">CONTRATO DE SERVICIOS DE PUBLICIDAD</h1>
          <h2 class="cover_subtitle">[OTOÑO-INVIERNO 2022]</h2>
          <!-- Imagen de Cover -->
    
          <div class="information_container">
              <p class="contract_number">Número de contrato: <span>[NUMERO DE CONTRATO]</span></p>
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
                    <div class="cover_left_information">[MADRID, 23 DE ENERO DE 2934]</div>
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
       </body>
    </html>
    `;
};

module.exports = {
  pruebaCreatePdf,
};
