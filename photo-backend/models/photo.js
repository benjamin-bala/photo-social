const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema(
  {
    posted_by: { type: String, required: true },
    title: { type: String, required: true },
    caption: { type: String },
    tags: { type: Array },
    photo: { type: Array, required: true },
    address: { type: String, required: true },
    likes: { type: Array },
  },
  {
    timestamps: true,
    collection: 'backdrops',
  }
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
