const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

const SupporterSchema = new Schema({
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

SupporterSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

SupporterSchema.plugin(beautifyUnique);

const Supporter = mongoose.model('Supporter', SupporterSchema);

module.exports = Supporter;
