import Template from './index.handlebars';

export default class UsersGroup {
  export default class UserCard {
    constructor(users) {
      this._users = users;
    }

    setUsers(users) {
      this._users = users;
    }

    render() {
      return Template({
        users: this._users
      });
    }
  }
}