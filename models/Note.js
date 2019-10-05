var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var noteSchema = new Schema({
  // The headline is the article associate with the note
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  date: String,
  // the text in the note will be a string
  noteText: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;
