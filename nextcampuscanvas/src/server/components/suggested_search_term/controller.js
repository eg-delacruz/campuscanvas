//Store
import store from "@server/components/suggested_search_term/store";

async function addSearchTerm(search_term) {
  if (!search_term) {
    console.error(
      "[suggested_search_term error | addSearchTerm function] No search term provided"
    );
    throw new Error("No se ha proporcionado un término de búsqueda");
  }

  try {
    //Check if search term already exists
    const existing_search_term = await store.get(search_term);
    if (existing_search_term) {
      //Update existing search term
      existing_search_term.times_suggested++;
      existing_search_term.last_time_suggested = new Date();
      const updated_search_term = await store.update(existing_search_term);
      return updated_search_term;
    }

    //Add new search term
    const NEW_SEARCH_TERM = {
      search_term,
      times_suggested: 1,
      last_time_suggested: new Date(),
    };
    const added_search_term = await store.add(NEW_SEARCH_TERM);
    return added_search_term;
  } catch (error) {
    console.error(
      "[suggested_search_term error | addSearchTerm function]" + error.message
    );
  }
}

module.exports = {
  addSearchTerm,
};
