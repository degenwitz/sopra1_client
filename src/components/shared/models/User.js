/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.creationDate = "unkown";
    this.birthday = "unknown";
    this.games = null;
    this.moves = null;
    Object.assign(this, data);
  }
}
export default User;
