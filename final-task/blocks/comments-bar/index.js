import Template from './index.handlebars';

export default class CommentsBar {
  constructor(comments) {
    this._comments = comments || [];
  }

  render() {
    return Template({
      comments: this._comments,
      user: this._user
    });
  }
}