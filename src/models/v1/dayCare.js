const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

const DayCareSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'DayCare [name] field is required'],
    unique: 'Given day care is already in use',
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

DayCareSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

DayCareSchema.plugin(beautifyUnique);

const DayCare = mongoose.model('DayCare', DayCareSchema);

module.exports = DayCare;
