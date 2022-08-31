const pruebaCreatePdf = (contractNumber, contrato) => {
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
       </body>
    </html>
    `;
};

module.exports = {
  pruebaCreatePdf,
};
