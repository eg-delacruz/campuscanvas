//Services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPointsV2 from '@services/api/v2';

const checkIfPendingValidationsAvailable = async () => {
  const response = await axiosFetcher({
    url: endPointsV2.admin.students.checkIfPendingValidationsAvailable,
    method: 'get',
    extraHeaders: {
      required_info: 'check_if_pending_validations_available',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

export default {
  checkIfPendingValidationsAvailable,
};
