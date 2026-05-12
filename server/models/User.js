// server/models/User.js
// MongoDB/Mongoose removed.
// Keep this file only so old imports do not crash the server.
// If any route still depends on User.findOne(), User.create(), etc.,
// replace that route with your current auth/storage logic.

const users = [];

class User {
  constructor(data = {}) {
    this.name = data.name || "";
    this.email = data.email || "";
    this.passwordHash = data.passwordHash || "";
    this.createdAt = data.createdAt || new Date();
    this.id = data.id || data._id || String(Date.now());
    this._id = this.id;
  }

  async save() {
    const existingIndex = users.findIndex((u) => u.email === this.email);

    if (existingIndex >= 0) {
      users[existingIndex] = this;
    } else {
      users.push(this);
    }

    return this;
  }

  static async create(data) {
    const user = new User(data);
    return user.save();
  }

  static async findOne(query = {}) {
    if (query.email) {
      return users.find((u) => u.email === query.email) || null;
    }

    if (query.id || query._id) {
      const id = query.id || query._id;
      return users.find((u) => u.id === id || u._id === id) || null;
    }

    return null;
  }

  static async findById(id) {
    return users.find((u) => u.id === id || u._id === id) || null;
  }

  static async find() {
    return users;
  }

  static async deleteOne(query = {}) {
    const index = users.findIndex((u) => {
      if (query.email) return u.email === query.email;
      if (query.id || query._id) return u.id === query.id || u._id === query._id;
      return false;
    });

    if (index >= 0) {
      users.splice(index, 1);
      return { deletedCount: 1 };
    }

    return { deletedCount: 0 };
  }
}

module.exports = User;