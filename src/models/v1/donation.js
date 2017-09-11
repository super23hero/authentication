const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DonationSchema = new Schema({
  donor: {
    name: {
      type: String,
      trim: true,
      required: [true, 'Donation Donor [name] field is required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Donation Donor [email] field is required'],
    },
  },
  items: {
    toy: Boolean,
    cloth: Boolean,
    shoe: Boolean,
  },
  child: {
    type: ObjectId,
    ref: 'Child',
  },
  status: {
    type: String,
    trim: true,
    enum: ['pending', 'complete'],
    required: [true, 'Donation [status] field is required'],
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

DonationSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

DonationSchema.plugin(beautifyUnique);

const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;
