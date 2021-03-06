const DEFAULT_IMAGE_URL = 'http://tpk-1.ru/wp-content/themes/basic/images/no_photo.png';

export default class Offer {
  constructor(options) {
    this.title = options.title || null;
    this.category = options.category || null;

    this.user = options.user;
    this.imageURL = options.imageURL || DEFAULT_IMAGE_URL;
    this.text = options.text || '';

    this.comments = options.comments || [];
    this.reviews = options.reviews || [];
    this.likedUsers = options.likedUsers || [];
    this.addedUsers = options.addedUsers || [];

    this.likedAmount = this.likedUsers.length;
    this.addedAmount = this.addedUsers.length;
    this.timespan = options.timespan || null;
    this.location = options.location || null;

    this.implemented = options.implemented || false;
  }
}