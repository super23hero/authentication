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
    status: {
      type: String,
      trim: true,
      enum: ['willReceive', 'received', 'delivered'],
      required: [true, 'Child [toy_status] field is required'],
    },
    wish: {
      type: String,
      required: [true, 'Child [toy_wish] field is required'],
    },
  },
  cloth: {
    status: {
      type: String,
      trim: true,
      enum: ['willReceive', 'received', 'delivered'],
      required: [true, 'Child [cloth_status] field is required'],
    },
    size: {
      type: String,
      required: [true, 'Child [cloth_size] field is required'],
    },
  },
  shoe: {
    status: {
      type: String,
      trim: true,
      enum: ['willReceive', 'received', 'delivered'],
      required: [true, 'Child [shoe_status] field is required'],
    },
    size: {
      type: String,
      required: [true, 'Child [shoe_size] field is required'],
    },
  },
  class: {
    type: ObjectId,
    ref: 'Class',
    required: [true, 'Child [class] field is required'],
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
