import OfferPopupTemplate from './index.handlebars';
import UsersGroupTemplate from 'blocks/users-group/index.handlebars';
import $ from 'jquery';
import PopupBase from 'logic/popup-base';
import Comment from 'logic/comment';
import CommentsBar from 'blocks/comments-bar';
import {
  addReview,
  getReviews,
  deleteReview,
  addOffer,
  likeOffer
} from 'logic/ajax-client';

export default class OfferPopup extends PopupBase {
  constructor(options) {
    super();

    this._$obj = options.$obj || $('<div>').addClass('offer-popup');

    this._$likedUsers = null;
    this._$addedUsers = null;

    this._$closeButton = null;
    this._$deleteOfferButton = null;
    this._$addButton = null;
    this._$likeButton = null;

    this._offer = options.offer || null;
    this._commentsBar = null;

    this._onDeleteOffer = options.onDeleteOffer || null;
    this._onAddOffer = options.onAddOffer || null;
    this._onLikeOffer = options.onLikeOffer || null;

    this._addReview = this._addReview.bind(this);
    this._deleteReview = this._deleteReview.bind(this);
    
    this._handleAddReviewSuccess = this._handleAddReviewSuccess.bind(this);
    this._handleGetReviewsSuccess = this._handleGetReviewsSuccess.bind(this);
    this._handleDeleteReviewSuccess = this._handleDeleteReviewSuccess.bind(this);
    
    this._handleDeleteOfferButton = this._handleDeleteOfferButton.bind(this);
    this._handleCloseButton = this._handleCloseButton.bind(this);
    this._handleAddButton = this._handleAddButton.bind(this);
    this._handleLikeButton = this._handleLikeButton.bind(this);
  }

  setOffer(offer) {
    this._offer = offer;
  }

  setOnDeleteOffer(handler) {
    this._onDeleteOffer = handler;
  }

  setOnAddOffer(handler) {
    this._onAddOffer = handler;
  }

  setOnLikeOffer(handler) {
    this._onLikeOffer = handler;
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
    var $newObj = $(OfferPopupTemplate(this._offer));

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

  _handleAddReviewSuccess(newReviews) {
    this._commentsBar.setComments(newReviews);
    this._commentsBar.renderComments();
  }

  _handleGetReviewsSuccess(newReviews) {
    var $commentsBar = this._$obj.find('.comments-bar');

    this._commentsBar = new CommentsBar($commentsBar, {
      modifier: 'popup',
      onSubmit: this._addReview,
      onCommentDelete: this._deleteReview,
      comments: newReviews
    });
    this._commentsBar.render();
  }

  _handleDeleteReviewSuccess(newReviews) {
    this._handleAddReviewSuccess(newReviews);
  }

  _addReview(newReviewText) {
    let review = new Comment({
      text: newReviewText
    });
    addReview({
      review,
      offerId: this._offer.id,
      onSuccess: this._handleAddReviewSuccess
    });
  }

  _deleteReview(id) {
    deleteReview({
      id,
      offerId: this._offer.id,
      onSuccess: this._handleDeleteReviewSuccess
    });
  }

  _handleCloseButton() {
    this.close();
  }

  _handleDeleteOfferButton() {
    this._onDeleteOffer(this._offer.id);
    this.close();
  }

  _handleAddButton() {
    addOffer({
      id: this._offer.id,
      onSuccess: this._onAddOffer
    });
  }

  _handleLikeButton() {
    likeOffer({
      id: this._offer.id,
      onSuccess: this._onLikeOffer
    });
  }

  _init() {
    getReviews({
      offerId: this._offer.id,
      onSuccess: this._handleGetReviewsSuccess
    });

    this._$likedUsers = this._$obj.find('.offer-popup__liked-users');
    this._$addedUsers = this._$obj.find('.offer-popup__added-users');

    this._$closeButton = this._$obj.find('.offer-popup__close-button');
    this._$deleteOfferButton = this._$obj.find('.offer-popup__delete-offer-button');
    this._$addButton = this._$obj.find('.offer-popup__add-button');
    this._$likeButton = this._$obj.find('.offer-popup__like-button');

    this._$deleteOfferButton.click(this._handleDeleteOfferButton);
    this._$closeButton.click(this._handleCloseButton);
    this._$addButton.click(this._handleAddButton);
    this._$likeButton.click(this._handleLikeButton);
  }
}