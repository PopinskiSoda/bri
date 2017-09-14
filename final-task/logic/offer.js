export default class OfferJS {
  constructor(options) {
    this._user = options.user;
    this._imageUrl = options.imageUrl || 'http://tpk-1.ru/wp-content/themes/basic/images/no_photo.png';
    this._comments = options.comments || [];
    this._likedUsers = options.likedUsers || [];
    this._addedUsers = options.addedUsers || [];
  }
}