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
    isEdited: {
      type: 'Boolean',
      required: true,
      default: false,
    },
    isOriginal: { type: 'Boolean', required: true, default: true },
    isForwarded: { type: 'Boolean', required: true, default: false },
    isDeletedFlag: { type: 'Boolean' },
    repliedMessage: {
      type: mongoose.Schema.ObjectId,
      ref: 'Message',
    },
    forwardedFrom: {
      type: mongoose.Schema.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message = mongoose.model('Message', Schema);

module.exports = Message;
