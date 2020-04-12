const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  title: { type: String },
  body: { type: String },
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)