import SibApiV3Sdk from 'sib-api-v3-sdk';

//Sendinblue is the platform used for email marketing

//nombre and apellidos are not strictly required data.
//email is required!
const createContact = (email, nombre, apellidos) => {
  const myApiKey = process.env.NEXT_PUBLIC_SENDINBLUE_CC_API_KEY;
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = myApiKey;

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  let createContact = new SibApiV3Sdk.CreateContact();

  createContact = {
    attributes: {
      nombre: nombre,
      apellidos: apellidos,
    },
    email: email,
  };

  apiInstance.createContact(createContact).then(
    function (data) {
      console.log(
        'API called successfully. Returned data: ' + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
};

module.exports = {
  createContact,
};
