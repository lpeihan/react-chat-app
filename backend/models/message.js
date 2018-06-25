'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * MessageSchema
 */
const MessageSchema = new Schema({
  user: { type: String, ref: 'User' },
  username: { type: String },
  user_avatar: { type: String },
  content: String,
  create_date: { type: Number, default: Date.now }
});

MessageSchema.index({ create_date: 1 });

module.exports = mongoose.model('Message', MessageSchema);
