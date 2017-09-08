const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Album [name] field is required'],
  },
  description: String,
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

AlbumSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

AlbumSchema.plugin(beautifyUnique);

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
