const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // 父级分类模型
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

module.exports = mongoose.model('Category', schema)