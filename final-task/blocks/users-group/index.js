import Template from './index.handlebars';
import $ from 'jquery';

export default class UsersGroup {

  constructor(options) {
    this._$obj = options.$obj || $('<div>').addClass('users-group');
    this._users = options.users || [];
    this._title = options.title || '';
  }

  setUsers(users) {
    this._users = users;
  }

  render() {
    var $newObj = $(Template({
      users: this._users,
      title: this._title
    }));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
  }
}