import {addComment, getComments} from 'Logic/ajax-client/comments';
import Template from './index.handlebars';
import $ from 'jquery';
import PopupBase from 'Logic/popup-base';
import Comment from 'Logic/comment';
import CommentsBar from 'Blocks/comments-bar';

export default class OfferPopup extends PopupBase {
  constructor($obj, offer) {
    super();

    this._$obj = $obj;
    this._$closeButton = null;

    this._offer = offer || null;
    this._commentsBar = null;

    this._addComment = this._addComment.bind(this);
    this._handleAddCommentSuccess = this._handleAddCommentSuccess.bind(this);
    this._handleGetCommentsSuccess = this._handleGetCommentsSuccess.bind(this);
    this.close = this.close.bind(this);
    this.renderComments = this.renderComments.bind(this);
  }

  setOffer(offer) {
    this._offer = offer;
  }

  open() {
    super.open();
    this._$obj.removeClass('offer-popup--hidden');
  }

  close() {
    super.close();
    this._$obj.addClass('offer-popup--hidden');
  }

  render() {
    var $newObj = $(Template(this._offer));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
    this._init();
  }

  renderCommentsBar() {
    this._commentsBar.render();
  }

  renderComments() {
    this._commentsBar.renderComments();
  }

  _handleAddCommentSuccess(newComments) {
    this._commentsBar.setComments(newComments);
    this._commentsBar.renderComments();
  }

  _handleGetCommentsSuccess(newComments) {
    var $commentsBar = this._$obj.find('.comments-bar');

    this._commentsBar = new CommentsBar($commentsBar, {
      modifier: 'popup',
      onSubmit: this._addComment,
      comments: newComments
    });
    this._commentsBar.render();
  }

  _addComment(newCommentText) {
    let comment = new Comment({
      text: newCommentText
    });
    addComment({
      comment,
      offerId: 1,
      onSuccess: this._handleAddCommentSuccess
    });
  }

  _init() {
    getComments({
      offerId: 1,
      onSuccess: this._handleGetCommentsSuccess
    });

    this._$closeButton = this._$obj.find('.button--close');
    this._$closeButton.click(this.close);
  }
}