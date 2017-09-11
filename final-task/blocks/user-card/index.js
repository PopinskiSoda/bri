import Template from './index.handlebars';

export default class UserCard {
  constructor(user) {
    this._user = user
  }

  render() {
    return Template({
      user: this._user
    })
  }
}