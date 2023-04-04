let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSettingsSchema = new mongoose.Schema({
  userID: {
    type: Schema.ObjectId,
    required: [true, 'El ID del usuario es necesario'],
    unique: true,
  },
  settings: {
    type: Object,
    required: true,
    entries_per_admin_discouns_table_page: {
      type: Number,
      default: 10,
    },
  },
});

export default mongoose.models.AdminSettings ||
  mongoose.model('AdminSettings', AdminSettingsSchema);
