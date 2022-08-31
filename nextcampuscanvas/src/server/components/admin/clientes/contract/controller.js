import store from '@server/components/admin/clientes/contract/store';
//import { createPublicityContract } from '@server/services/createPublicityContract';
//import { pruebaCreatePdf } from '@server/services/pruebaCreatePdf';
//https://openbase.com/js/html-pdf/documentation
import pdf from 'html-pdf';

const generateContract = async ({ cliente, campana, contrato }) => {
  if (
    !(
      cliente.nombre ||
      cliente.tipo ||
      cliente.dni ||
      campana.tipo_de_campana ||
      contrato.lugar_de_creacion
    )
  ) {
    throw new Error(
      '[Client/contract controller] Información insuficiente para generar contrato'
    );
  }

  const client_copy = JSON.parse(JSON.stringify(cliente));
  const campaign_copy = JSON.parse(JSON.stringify(campana));
  const contract_info_copy = JSON.parse(JSON.stringify(contrato));

  try {
    const contract_info = {
      client_name: client_copy.nombre.toLowerCase(),
      client_type: client_copy.tipo.toLowerCase(),
      client_DNI: client_copy.dni.toLowerCase(),
      company: client_copy.empresa_representada.toLowerCase(),
      campaign_type: campaign_copy.tipo_de_campana.toLowerCase(),
      creation_place: contract_info_copy.lugar_de_creacion.toLowerCase(),
      creation_date: new Date(),
    };

    //const created_contract = await store.add(contract_info);

    //const contractNumber = created_contract.number;

    const contractNumber = 20;

    //PDF options
    const options = {
      format: 'A4',
      paginationOffset: 2,
      header: {
        height: '20mm',
        contents: `<div style="font-family: 'Open Sans', sans-serif; padding-right: 52px; padding-top: 10px; font-size: 12px; text-align: right;"><strong>No. Contrato: </strong>${contractNumber}<br><br><br></div>`,
      },
      footer: {
        height: '20mm',
      },
    };
    pdf
      .create(
        //createPublicityContract(contractNumber, cliente, campana, contrato),
        `
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
    `,
        {}
        //options
      )
      .toFile('contrato.pdf', (error) => {
        if (error) {
          throw new Error('[Client/contract controller]', error);
        }
      });
  } catch (error) {
    throw new Error('[Client/contract controller]', error);
  }
};

module.exports = { generateContract };
