var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var photoSchema = new mongoose.Schema({
  link:             String,
  username:          String,
  likes:            Number,
  url:           String,
  location:         {
                      name: String,
                      lat: Number,
                      lng: Number
                    }
});

var collectionSchema = new mongoose.Schema({
  name: String,
  photos: [photoSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

var Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
