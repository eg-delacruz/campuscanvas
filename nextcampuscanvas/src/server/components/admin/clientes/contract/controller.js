import store from '@server/components/admin/clientes/contract/store';
import { createPublicityContract } from '@server/services/createPublicityContract';
import pdf from 'html-pdf';

const generateContract = async (data) => {
  console.log(data);
  //TODO: Pass al required data to lowercase
  try {
    //TODO: Save Contract data in DB to generate contract number!!
    const contractNumber = 1234;
    pdf
      .create(createPublicityContract(data, contractNumber), {})
      .toFile('contrato.pdf', (error) => {
        if (error) {
          throw new Error('[Client/contract controller error]', error);
        }
      });
  } catch (error) {
    throw new Error('[Client/contract controller error]', error);
  }
};

module.exports = { generateContract };
