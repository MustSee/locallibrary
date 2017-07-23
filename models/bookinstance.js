var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/*  We've decided not to have a model for the BookInstance:status
    We will hard code the acceptable values because
    we don't expect these to change.  */
var BookInstanceSchema = Schema(
  {
    book: {type: Schema.ObjectId, ref: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {type: String, required: true,
      enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
      default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance' + this._id;
});

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
