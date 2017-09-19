import CommentsBarTemplate from './index.handlebars';
import CommentsTemplate from './comments.handlebars';
import $ from 'jquery';

export default class CommentsBar {
  constructor($obj, options) {
    this._$obj = $obj;
    this._$comments = null;
    this._$textarea = null;

    this._comments = options && options.comments || [];
    this._user = options && options.user || null;
    this._modifier = options && options.modifier || null;

    this._onSubmit = options && options.onSubmit || null;

    this._handleOnEnter = this._handleOnEnter.bind(this);
  }

  setComments(comments) {
    this._comments = comments;
  }

  render(options) {
    var $newObj = $(CommentsBarTemplate({
      comments: this._comments,
      user: this._user,
      modifier: this._modifier
    }));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
    this._init();
  }

  renderComments() {
    var $newComments = $(CommentsTemplate(this._comments));

    this._$comments.replaceWith($newComments);
    this._$comments = $newComments;
  }

  // addComment() {
  //   this._comments.push({text: "text"});
  //   this.renderComments();
  // }

  _handleOnEnter(e) {
    if (e.which == 13) {
      if(this._onSubmit) {
        let newCommentText = this._$textarea.val();
        this._onSubmit(newCommentText);
      }
    }
  }

  _init() {
    this._$comments = this._$obj.find('.comments-bar__comments');
    this._$textarea = this._$obj.find('.comments-bar__textarea');

    this._$textarea.keypress(this._handleOnEnter);
  }
}