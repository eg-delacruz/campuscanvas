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
