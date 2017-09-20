import {getComments, addComment} from 'logic/ajax-client/comments';
import Template from './index.handlebars';
import CommentsBar from 'blocks/comments-bar';
import Comment from 'logic/comment';
import $ from 'jquery';

export default class OfferCard {
  constructor($obj, options) {
    this._$obj = $obj;

    this._offer = options.offer || null;
    this._offerPopup = options.offerPopup || null;
    this._commentsBar = null;
    this._handleCommentsButton = options.handleCommentsButton;

    this._addComment = this._addComment.bind(this);
    this._handlePopupButton = this._handlePopupButton.bind(this);
    // this._handleCommentsButton = this._handleCommentsButton.bind(this);
    this._handleGetCommentsSuccess = this._handleGetCommentsSuccess.bind(this);
    this._handleAddCommentSuccess = this._handleAddCommentSuccess.bind(this);
  }

  appendTo($parent) {
    this._$obj.appendTo($parent);
  }

  render() {
    var $newObj = $(Template(this._offer));

    if (this._$obj) {
      this._$obj.replaceWith($newObj);
    }
    this._$obj = $newObj;
    this._init();
  }

  renderCommentsBar() {
    this._commentsBar.render();
  }

  renderComments() {
    this._commentsBar.renderComments();
  }

  showCommentsBar() {
    this._commentsBar.show();
  }

  hideCommentsBar() {
    this._commentsBar.hide();
  }

  _handlePopupButton() {
    this._offerPopup.setOffer(this._offer);
    this._offerPopup.render();
    this._offerPopup.open();
  }

  // _handleCommentsButton() {
  //   this._commentsBar.hide();
  // }

  _handleAddCommentSuccess(newComments) {
    this._commentsBar.setComments(newComments);
    this._commentsBar.renderComments();
  }

  _handleGetCommentsSuccess(newComments) {
    var $commentsBar = this._$obj.find('.comments-bar');

    this._commentsBar = new CommentsBar($commentsBar, {
      modifier: 'card',
      onSubmit: this._addComment,
      comments: newComments
    });
    this._commentsBar.render();
    this._commentsBar.hide();
  }

  _addComment(newCommentText) {
    let comment = new Comment({
      text: newCommentText
    });

    addComment({
      comment,
      offerId: this._offer.id,
      onSuccess: this._handleAddCommentSuccess
    });
  }

  _init() {
    const self = this;

    getComments({
      offerId: this._offer.id,
      onSuccess: this._handleGetCommentsSuccess
    });

    this._$obj.find('.offer-card__review-button').click(function(e) {console.log("review");});

    this._$obj.find('.offer-card__like-button').click(function(e) {console.log("like");});

    this._$obj.find('.offer-card__add-button').click(function(e) {console.log("add");});

    this._$obj.find('.offer-card__comment-button').click(function(e) {
      let commentsBar = self._commentsBar;
      self._handleCommentsButton(commentsBar);
    });

    this._$obj.find('.offer-card__popup-button').click(this._handlePopupButton);
  }
}