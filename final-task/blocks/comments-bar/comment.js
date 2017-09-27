import Template from './comment.handlebars';
import {getCurrentUser} from 'logic/auth';
import $ from 'jquery';

export default class CommentsBarComment {
  constructor(options) {
    this._$obj = options.$obj || $('<div>').addClass('comments-bar__comment');

    this._$deleteButton = null;

    this._comment = options.comment || null;
    this._avatarSize = options.avatarSize || 'medium';
    this._onCommentDelete = options.onCommentDelete;
  }

  render(options) {
    var $newObj = $(Template(Object.assign(this._comment, {
      avatarSize: this._avatarSize,
      currentUser: getCurrentUser()
    })));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
    this._init();
  }

  appendTo($parent) {
    this._$obj.appendTo($parent);
  }

  _init() {
    var self = this;

    this._$deleteButton = this._$obj.find('.comments-bar__button-delete');
    this._$deleteButton.click(function(e) {
      self._onCommentDelete(self._comment.id);
    });
  }
}