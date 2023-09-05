import dbConnect from "@server/dbConnect";
import config from "@server/config";
dbConnect(config.dbURL);

//Model
import SuggestedSearchTerm from "@server/components/suggested_search_term/model";
import { get } from "mongoose";

///////////////////// Add search term //////////////////////////////
const addSearchTerm = async (search_term) => {
  return await SuggestedSearchTerm.create(search_term);
};

///////////////////// Get search term //////////////////////////////
const getSearchTerm = async (search_term) => {
  return await SuggestedSearchTerm.findOne({ search_term });
};

///////////////////// Update search term //////////////////////////////
const updateSearchTerm = async (search_term) => {
  const updatedTerm = await search_term.save();
  return updatedTerm;
};

module.exports = {
  add: addSearchTerm,
  get: getSearchTerm,
  update: updateSearchTerm,
};
