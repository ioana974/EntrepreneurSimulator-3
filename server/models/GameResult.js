// server/models/GameResult.js
// MongoDB/Mongoose removed.
// Compatibility stub so old imports do not crash the server.
// Data is stored only in memory and resets when the server restarts.

const gameResults = [];

class GameResult {
  constructor(data = {}) {
    this.user = data.user || null;
    this.playerName = data.playerName || "";
    this.playerEmail = data.playerEmail || "";
    this.scenarioId = data.scenarioId || "";
    this.state = data.state || {};
    this.createdAt = data.createdAt || new Date();

    this.id = data.id || data._id || String(Date.now()) + "_" + Math.random().toString(36).slice(2);
    this._id = this.id;
  }

  async save() {
    const existingIndex = gameResults.findIndex((result) => result.id === this.id || result._id === this._id);

    if (existingIndex >= 0) {
      gameResults[existingIndex] = this;
    } else {
      gameResults.push(this);
    }

    return this;
  }

  static async create(data) {
    const result = new GameResult(data);
    return result.save();
  }

  static async find(query = {}) {
    let results = [...gameResults];

    if (query.user) {
      results = results.filter((result) => result.user === query.user);
    }

    if (query.playerEmail) {
      results = results.filter((result) => result.playerEmail === query.playerEmail);
    }

    if (query.scenarioId) {
      results = results.filter((result) => result.scenarioId === query.scenarioId);
    }

    return results;
  }

  static async findOne(query = {}) {
    const results = await GameResult.find(query);
    return results[0] || null;
  }

  static async findById(id) {
    return gameResults.find((result) => result.id === id || result._id === id) || null;
  }

  static async deleteOne(query = {}) {
    const index = gameResults.findIndex((result) => {
      if (query.id) return result.id === query.id;
      if (query._id) return result._id === query._id;
      if (query.playerEmail) return result.playerEmail === query.playerEmail;
      return false;
    });

    if (index >= 0) {
      gameResults.splice(index, 1);
      return { deletedCount: 1 };
    }

    return { deletedCount: 0 };
  }

  static async deleteMany(query = {}) {
    let deletedCount = 0;

    for (let i = gameResults.length - 1; i >= 0; i--) {
      const result = gameResults[i];

      const matchesUser = !query.user || result.user === query.user;
      const matchesEmail = !query.playerEmail || result.playerEmail === query.playerEmail;
      const matchesScenario = !query.scenarioId || result.scenarioId === query.scenarioId;

      if (matchesUser && matchesEmail && matchesScenario) {
        gameResults.splice(i, 1);
        deletedCount++;
      }
    }

    return { deletedCount };
  }
}

module.exports = GameResult;