const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const gameSchema = new mongoose.Schema({
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  started: {
    type: Date,
  },
  ended: {
    type: Date,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  winnerWpm: {
    type: Number,
  }
});

gameSchema.methods.addPlayer = function(player) {
  this.players.push(player);
  return this.save();
}

gameSchema.methods.seedText = function () {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a leo sagittis, fringilla velit ut, placerat elit. Mauris vestibulum bibendum ex quis molestie. Ut dictum velit in ex viverra laoreet. Phasellus elit libero, rhoncus sed tristique a, tincidunt eget lacus. Vivamus varius massa a odio suscipit condimentum. Cras et ipsum sed metus tincidunt aliquet ut a metus. Proin ultricies, ex vel dapibus ornare, arcu lorem gravida metus, id maximus nisi tellus eget urna. Etiam aliquam nisl erat, ac convallis diam faucibus ac. Aliquam ut metus ante. Integer feugiat eu nibh nec rutrum. Vestibulum a rhoncus nisi, quis consequat lorem. Aliquam egestas hendrerit placerat.';
};

gameSchema.pre('save', function(next) {
  if (!this.isModified('text')) {
    return next();
  }
  this.text = this.seedText();
  next();
});

module.exports = mongoose.model('Game', gameSchema);
