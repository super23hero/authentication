const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

const SuporterSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Suporter [name] field is required'],
  },
  site: {
    type: String,
    trim: true,
    required: [true, 'Suporter [email] field is required'],
  },
  logo: String,
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

SuporterSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

SuporterSchema.plugin(beautifyUnique);

const Suporter = mongoose.model('Suporter', SuporterSchema);

module.exports = Suporter;
