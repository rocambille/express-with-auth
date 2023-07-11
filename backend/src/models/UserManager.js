const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.database.query(
      `select id, username from  ${this.table} where id = ?`,
      [id]
    );
  }

  findByUsernameWithPassword(username) {
    return this.database.query(
      `select * from  ${this.table} where username = ?`,
      [username]
    );
  }

  findAll() {
    return this.database.query(`select id, username from  ${this.table}`);
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (username, hashedPassword) values (?, ?)`,
      [user.username, user.hashedPassword]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set username = ?, hashedPassword= ? where id = ?`,
      [user.username, user.hashedPassword, user.id]
    );
  }
}

module.exports = UserManager;
