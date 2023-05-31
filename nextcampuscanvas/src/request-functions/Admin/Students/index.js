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

const getVerifiedStudents = async ({ page, limit }) => {
  const response = await axiosFetcher({
    url: endPointsV2.admin.students.index,
    method: 'get',
    extraHeaders: {
      required_info: 'verified_students',
      page,
      limit,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getVerifiedStudentsCount = async () => {
  const response = await axiosFetcher({
    url: endPointsV2.admin.students.getVerifiedStudentsCount,
    method: 'get',
    extraHeaders: {
      required_info: 'verified_students_count',
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

const getUnhandledStuEmails = async () => {
  const response = await axiosFetcher({
    url: endPointsV2.admin.students.index,
    method: 'get',
    extraHeaders: {
      required_info: 'unhandled_stu_emails',
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
  getVerifiedStudents,
  getVerifiedStudentsCount,
  getUnhandledStuEmails,
};
