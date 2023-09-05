let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuggestedSearchTermSchema = new mongoose.Schema({
  search_term: {
    type: String,
    required: [true, "El término de búsqueda es necesario"],
  },
  times_suggested: {
    type: Number,
    required: [true, "El número de veces sugerido es necesario"],
    default: 1,
  },
  last_time_suggested: {
    type: Date,
    required: [true, "La última vez sugerido es necesaria"],
  },
});

export default mongoose.models.SuggestedSearchTerm ||
  mongoose.model("SuggestedSearchTerm", SuggestedSearchTermSchema);
