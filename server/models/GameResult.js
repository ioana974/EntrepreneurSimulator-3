const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameResultSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  playerName: { type: String },
  playerEmail: { type: String },
  scenarioId: { type: String },
  state: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameResult', GameResultSchema);
