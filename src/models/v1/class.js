const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ClassSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Class [name] field is required'],
    unique: 'Given name is already in use',
  },
  day_care: {
    type: ObjectId,
    ref: 'DayCare',
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

ClassSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

ClassSchema.plugin(beautifyUnique);

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
