//Services
import axiosFetcher from "@services/axiosFetcher";

//Endpoints
import endPoints from "@services/api/v2";

const addNewSearchTerm = async (search_term) => {
  const response = await axiosFetcher({
    url: endPoints.suggested_search_term.addNewSearchTerm,
    method: "post",
    payload: {
      search_term,
    },
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error);
  }

  return response.body;
};

export default { addNewSearchTerm };
