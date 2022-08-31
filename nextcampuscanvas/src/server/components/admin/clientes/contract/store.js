import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import Contract from '@server/components/admin/clientes/contract/model';

/////////////////////Add contract//////////////////////////////

const addContract = async (contract_info) => {
  try {
    //Setting contract number
    let contract_number;

    const amount_of_contracts = await Contract.count();
    if (amount_of_contracts === 0) {
      contract_number = 1;
    } else {
      const last_contract = await Contract.findOne()
        .sort({ creation_date: -1 })
        .limit(1);
      contract_number = last_contract.number + 1;
    }

    const new_contract = { ...contract_info, number: contract_number };

    //If exists, don´t create a new one
    const exists = await contractExists(new_contract.number);
    if (exists) {
      return false;
    }

    const created_contract = await Contract.create(new_contract);
    return created_contract;
  } catch (error) {
    throw new Error('[clients/contract store]', error);
  }
};

/////////////////////Check if contract exists//////////////////////////////

const contractExists = async (number) => {
  const exists = await Contract.exists({
    number,
  });
  if (exists) {
    return true;
  }
  return false;
};

module.exports = {
  add: addContract,
};
