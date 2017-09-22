import {getComments, addComment, likeOffer, addOffer} from 'logic/ajax-client';
import {getCurrentUser} from 'logic/auth';
import Template from './index.handlebars';
import CommentsBar from 'blocks/comments-bar';
import Comment from 'logic/comment';
import $ from 'jquery';

export default class OfferCard {
  constructor($obj, options) {
    this._$obj = $obj || $('<div>').addClass('offer-card');
    
    this._$commentsBar = null;

    this._$reviewButton = null;
    this._$likeButton = null;
    this._$addButton = null;
    this._$commentButton = null;
    this._$popupButton = null;

    this._offer = options.offer || null;
    this._offerPopup = options.offerPopup || null;
    this._commentsBar = null;
    this._handleCommentsButton = options.handleCommentsButton;

    this._handlePopupButton = this._handlePopupButton.bind(this);
    this._handleLikeButton = this._handleLikeButton.bind(this);
    this._handleAddButton = this._handleAddButton.bind(this);
    this._handleCommentsButton = this._handleCommentsButton.bind(this);

    this._addComment = this._addComment.bind(this);
    this._handleGetCommentsSuccess = this._handleGetCommentsSuccess.bind(this);
    this._handleAddCommentSuccess = this._handleAddCommentSuccess.bind(this);
    this._handleLikeOfferSuccess = this._handleLikeOfferSuccess.bind(this);
    this._handleAddOfferSuccess = this._handleAddOfferSuccess.bind(this);
  }

  appendTo($parent) {
    this._$obj.appendTo($parent);
  }

  render() {
    var offer = this._offer;
    var $newObj = $(Template(Object.assign(offer, {
      currentUser: getCurrentUser()
    })));

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

  _handleCommentsButton() {
    this._commentsBar.hide();
  }

  _handleAddCommentSuccess(newComments) {
    this._commentsBar.setComments(newComments);
    this._commentsBar.renderComments();
  }

  _handleGetCommentsSuccess(newComments) {
    this._commentsBar = new CommentsBar(this._$commentsBar, {
      modifier: 'card',
      onSubmit: this._addComment,
      comments: newComments
    });
    this._commentsBar.render();
    this._commentsBar.hide();
  }

  _handleLikeButton() {
    likeOffer({
      id: this._offer.id,
      onSuccess: this._handleLikeOfferSuccess
    });
  }

  _handleLikeOfferSuccess() {
    this._$likeButton.prop({disabled: true});
  }

  _handleAddButton() {
    addOffer({
      id: this._offer.id,
      onSuccess: this._handleAddOfferSuccess
    });
  }

  _handleAddOfferSuccess() {
    this._$addButton.prop({disabled: true});
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

    this._$commentsBar = this._$obj.find('.comments-bar');

    this._$reviewButton = this._$obj.find('.offer-card__review-button');
    this._$likeButton = this._$obj.find('.offer-card__like-button');
    this._$addButton = this._$obj.find('.offer-card__add-button');
    this._$commentButton = this._$obj.find('.offer-card__comment-button');
    this._$popupButton = this._$obj.find('.offer-card__popup-button');

    this._$popupButton.click(this._handlePopupButton);
    this._$reviewButton.click(function(e) {console.log("review");});
    this._$likeButton.click(this._handleLikeButton);
    this._$addButton.click(this._handleAddButton);

    this._$commentButton.click(function(e) {
      let commentsBar = self._commentsBar;
      self._handleCommentsButton(commentsBar);
    });
  }
}