const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    sender: {
      type: 'Number',
      required: true,
    },
    body: {
      type: 'String',
      required: true,
    },
    conversation: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    isRead: {
      type: 'Boolean',
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message = mongoose.model('Message', Schema);

module.exports = Message;
