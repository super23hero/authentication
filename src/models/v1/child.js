const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ChildSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Child [name] field is required'],
    unique: 'Given name is already in use',
  },
  nickname: {
    type: String,
    trim: true,
    required: [true, 'Child [nickname] field is required'],
  },
  sex: {
    type: String,
    trim: true,
    enum: ['m', 'f'],
    required: [true, 'Child [sex] field is required'],
  },
  age: {
    type: Number,
    required: [true, 'Child [age] field is required'],
  },
  photo: {
    type: String,
    required: [true, 'Child [photo] field is required'],
  },
  toy: {
    will_receive: Boolean,
    received: Boolean,
    delivered: Boolean,
    wish: {
      type: String,
      required: [true, 'Child [toy_wish] field is required'],
    },
  },
  cloth: {
    will_receive: Boolean,
    received: Boolean,
    delivered: Boolean,
    size: {
      type: String,
      required: [true, 'Child [cloth_size] field is required'],
    },
  },
  shoe: {
    will_receive: Boolean,
    received: Boolean,
    delivered: Boolean,
    size: {
      type: String,
      required: [true, 'Child [shoe_size] field is required'],
    },
  },
  class: {
    type: ObjectId,
    ref: 'Class',
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

ChildSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

ChildSchema.plugin(beautifyUnique);

const Child = mongoose.model('Child', ChildSchema);

module.exports = Child;
