const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    physical: { type: Number },
    magic: { type: Number },
    defence: { type: Number },
    difficult: { type: Number },
  },
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTips: { type: String },
  battleTips: { type: String },
  story: { type: String },

  skills: [{
    icon: { type: String },
    name: { type: String },
    delay: { type: String },
    cost: { type: String },
    description: { type: String },
    tips: { type: String },
  }],

  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String },
  }],
})

module.exports = mongoose.model('Hero', schema)