const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PhotoSchema = new Schema({
  legend: {
    type: String,
    trim: true,
    required: [true, 'Photo [legend] field is required'],
  },
  album: {
    type: ObjectId,
    ref: 'Album',
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

PhotoSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

PhotoSchema.plugin(beautifyUnique);

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
