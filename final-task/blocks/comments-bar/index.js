import Template from './index.handlebars';
import CommentsBarComment from './comment.js';
import {getCurrentUser} from 'logic/auth';
import $ from 'jquery';

const ENTER_KEY_CODE = 13;

export default class CommentsBar {
  constructor($obj, options) {
    this._$obj = $obj || $('<div>').addClass('comments-bar');

    this._$comments = null;
    this._$textarea = null;

    this._comments = options && options.comments || [];
    this._modifier = options && options.modifier || null;

    this._onSubmit = options && options.onSubmit || null;
    this._onCommentDelete = options && options.onCommentDelete || null;

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  hide() {
    this._$obj.addClass('comments-bar--hidden');
  }

  show() {
    this._$obj.removeClass('comments-bar--hidden');
  }

  setComments(comments) {
    this._comments = comments;
  }

  render(options) {
    var $newObj = $(Template({
      comments: this._comments,
      user: getCurrentUser(),
      modifier: this._modifier
    }));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
    this._init();
  }

  renderComment(comment) {
    let commentsBarComment = new CommentsBarComment({
      comment,
      onCommentDelete: this._onCommentDelete
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