import Template from './index.handlebars';
import CommentsBarComment from './comment.js';
import {getCurrentUser} from 'logic/auth';
import $ from 'jquery';

const ENTER_KEY_CODE = 13;

export default class CommentsBar {
  constructor(options) {
    this._$obj = options.$obj || $('<div>').addClass('comments-bar');

    this._$comments = null;
    this._$textarea = null;

    this._hidden = options.hidden || true;

    this._comments = options.comments || [];
    this._modifier = options.modifier || '';
    this._avatarSize = options.avatarSize || 'medium';
    this._maxLength = options.maxLength || 500;

    this._onSubmit = options.onSubmit || null;
    this._onCommentDelete = options.onCommentDelete || null;

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  hide() {
    this._hidden = true;
    this._$obj.addClass('comments-bar--hidden');
  }

  show() {
    this._hidden = false;
    this._$obj.removeClass('comments-bar--hidden');
  }

  focus() {
    this._$textarea.focus();
  }

  setComments(comments) {
    this._comments = comments;
  }

  render() {
    var $newObj = $(Template({
      comments: this._comments,
      user: getCurrentUser(),
      modifier: this._modifier,
      avatarSize: this._avatarSize,
      maxLength: this._maxLength,
      currentUser: getCurrentUser(),
      hidden: this._hidden
    }));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
    this._init();
  }

  renderComment(comment) {
    let commentsBarComment = new CommentsBarComment({
      comment,
      onCommentDelete: this._onCommentDelete,
      avatarSize: this._avatarSize
    });
    commentsBarComment.render();

    commentsBarComment.appendTo(this._$comments);
  }

  renderComments() {
    this._$comments.empty();

    for (let i=0; i<this._comments.length; i++) {
      this.renderComment(this._comments[i]);
    }
  }

  _handleKeyPress(e) {
    if (e.which == ENTER_KEY_CODE) {
      e.preventDefault();

      if (this._onSubmit) {
        let newCommentText = this._$textarea.val();

        if(newCommentText.trim() !== '') {
          this._onSubmit(newCommentText);
          this._$textarea.val('');
        }
      }
    }
  }

  _init() {
    this._$comments = this._$obj.find('.comments-bar__comments');
    this._$textarea = this._$obj.find('.comments-bar__textarea');

    this._$textarea.keypress(this._handleKeyPress);
  }
}