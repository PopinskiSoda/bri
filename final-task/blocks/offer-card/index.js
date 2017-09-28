import {getCurrentUser} from 'logic/auth';
import Template from './index.handlebars';
import CommentsBar from 'blocks/comments-bar';
import Comment from 'logic/comment';
import $ from 'jquery';
import {
  getComments,
  addComment,
  deleteComment,
  likeOffer,
  addOffer,
  getCommentsSuccessRegister,
  likeOfferSuccessRegister,
  addOfferSuccessRegister,
  addCommentSuccessRegister,
  deleteCommentSuccessRegister
} from 'logic/ajax-client';

export default class OfferCard {
  constructor(options) {
    this._$obj = options.$obj || $('<div>').addClass('offer-card');

    this._$reviewButton = null;
    this._$likeButton = null;
    this._$addButton = null;
    this._$commentButton = null;
    this._$popupButton = null;

    this._$likedAmount = null;
    this._$addedAmount = null;
    this._$commentsAmount = null;
    this._$reviewsAmount = null;

    this._offer = options.offer || null;
    this._offerPopup = options.offerPopup || null;
    this._commentsBar = null;
    this._handleCommentsButton = options.handleCommentsButton;

    this._handlePopupButton = this._handlePopupButton.bind(this);
    this._handleLikeButton = this._handleLikeButton.bind(this);
    this._handleAddButton = this._handleAddButton.bind(this);
    this._handleCommentsButton = this._handleCommentsButton.bind(this);

    this._addComment = this._addComment.bind(this);
    this._deleteComment = this._deleteComment.bind(this);

    this._handleChangeCommentsSuccess = this._handleChangeCommentsSuccess.bind(this);
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

  _deleteComment(id) {
    deleteComment({
      id,
      offerId: this._offer.id
    });
  }

  _handlePopupButton() {
    this._offerPopup.setOffer(this._offer);
    this._offerPopup.render();
    this._offerPopup.open();
  }

  _handleChangeCommentsSuccess(newComments) {
    this._commentsBar.setComments(newComments);
    this._commentsBar.renderComments();
  }

  _handleLikeButton() {
    likeOffer({
      id: this._offer.id
    });
  }

  _handleLikeOfferSuccess(likedUsers) {
    this._offer.likedUsers = likedUsers;
    this._$likeButton.prop({disabled: true});
    this._$likedAmount.html(this._offer.likedUsers.length);
  }

  _handleAddButton() {
    addOffer({
      id: this._offer.id
    });
  }

  _handleAddOfferSuccess(addedUsers) {
    this._offer.addedUsers = addedUsers;
    this._$addButton.prop({disabled: true});
    this._$addedAmount.html(this._offer.addedUsers.length);
  }

  _addComment(newCommentText) {
    let comment = new Comment({
      text: newCommentText
    });

    addComment({
      comment,
      offerId: this._offer.id
    });
  }

  _init() {
    const self = this;

    likeOfferSuccessRegister(this._handleLikeOfferSuccess, this._offer.id);
    addOfferSuccessRegister(this._handleAddOfferSuccess, this._offer.id);
    getCommentsSuccessRegister(this._handleChangeCommentsSuccess, this._offer.id);
    addCommentSuccessRegister(this._handleChangeCommentsSuccess, this._offer.id);
    deleteCommentSuccessRegister(this._handleChangeCommentsSuccess, this._offer.id);

    getComments({
      offerId: this._offer.id
    });

    var $commentsBar = this._$obj.find('.comments-bar');

    this._commentsBar = new CommentsBar({
      $obj: $commentsBar,
      modifier: 'card',
      onSubmit: this._addComment,
      onCommentDelete: this._deleteComment,
      avatarSize: 'small',
      maxLength: 40
    });
    this._commentsBar.render();

    this._$reviewButton = this._$obj.find('.offer-card__review-button');
    this._$likeButton = this._$obj.find('.offer-card__like-button');
    this._$addButton = this._$obj.find('.offer-card__add-button');
    this._$commentButton = this._$obj.find('.offer-card__comment-button');
    this._$popupButton = this._$obj.find('.offer-card__popup-button');

    this._$likedAmount = this._$obj.find('.offer-card__liked-amount');
    this._$addedAmount = this._$obj.find('.offer-card__added-amount');
    this._$commentsAmount = this._$obj.find('.offer-card__comments-amount');
    this._$reviewsAmount = this._$obj.find('.offer-card__reviews-amount');

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