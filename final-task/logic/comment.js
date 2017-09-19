export default class Comment {
  constructor(options) {
    this._text = options.text || '';
    this._user = options.user || null;
  }
  
  getText() {
    return this._text;
  }

  getUser() {
    return this._user;
  }
}