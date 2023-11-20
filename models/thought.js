const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const reactionSchema = require('./reaction');

const dayJS = require('dayjs');

function time(timestamp) {
  const day = dayJS(timestamp);
  return day.format('DD/MM/YYYY');
}

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => new Date(date).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    getters: true,
  },
  id: false,
});

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;