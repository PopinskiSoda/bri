import OfferPopupTemplate from './index.handlebars';
import $ from 'jquery';
import PopupBase from 'logic/popup-base';
import Comment from 'logic/comment';
import CommentsBar from 'blocks/comments-bar';
import UsersGroup from 'blocks/users-group';
import {getCurrentUser} from 'logic/auth';
import * as AjaxClient from 'logic/ajax-client';

export default class OfferPopup extends PopupBase {
  constructor(options) {
    super();

    this._$obj = options.$obj || $('<div>').addClass('offer-popup');
    this._offer = options.offer || null;
    this._commentMaxLength = options.commentMaxLength || 500;

    this._likedUsersGroup = null;
    this._addedUsersGroup = null;

    this._$closeButton = null;
    this._$deleteOfferButton = null;
    this._$addButton = null;
    this._$likeButton = null;

    this._commentsBar = null;

    this._addReview = this._addReview.bind(this);
    this._deleteReview = this._deleteReview.bind(this);
    
    this._handleChangeReviewsSuccess = this._handleChangeReviewsSuccess.bind(this);
    this._handleLikeOfferSuccess = this._handleLikeOfferSuccess.bind(this);
    this._handleAddOfferSuccess = this._handleAddOfferSuccess.bind(this);
    
    this._handleDeleteOfferButton = this._handleDeleteOfferButton.bind(this);
    this._handleCloseButton = this._handleCloseButton.bind(this);
    this._handleAddButton = this._handleAddButton.bind(this);
    this._handleLikeButton = this._handleLikeButton.bind(this);
    this._handleCommentButton = this._handleCommentButton.bind(this);
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
    var $newObj = $(OfferPopupTemplate(Object.assign(this._offer, {
      currentUser: getCurrentUser()
    })));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
    this._init();
  }
  
  _handleLikeOfferSuccess(newLikedUsers) {
    this._$likeButton.prop({disabled: true});
    this._likedUsersGroup.setUsers(newLikedUsers);
    this._likedUsersGroup.render();
  }

  _handleAddOfferSuccess(newAddedUsers) {
    this._$addButton.prop({disabled: true});
    this._addedUsersGroup.setUsers(newAddedUsers);
    this._addedUsersGroup.render();
  }

  _handleChangeReviewsSuccess(reviewsData) {
    this._commentsBar.setComments(reviewsData.reviews);
    this._commentsBar.renderComments();
  }

  _addReview(newReviewText) {
    let review = new Comment({
      text: newReviewText
    });
    AjaxClient.addReview({
      review,
      offerId: this._offer.id,
    });
  }

  _deleteReview(id) {
    AjaxClient.deleteReview({
      id,
      offerId: this._offer.id,
    });
  }

  _handleCloseButton() {
    this.close();
  }

  _handleDeleteOfferButton() {
    AjaxClient.deleteOffer({
      id: this._offer.id
    });
    this.close();
  }

  _handleAddButton() {
    AjaxClient.addOffer({
      id: this._offer.id
    });
  }

  _handleLikeButton() {
    AjaxClient.likeOffer({
      id: this._offer.id
    });
  }

  _handleCommentButton() {
    this._commentsBar.show();
    this._commentsBar.focus();
  }

  _init() {
    AjaxClient.changeReviewsSuccessRegister(this._handleChangeReviewsSuccess, this._offer.id);
    AjaxClient.likeOfferSuccessRegister(this._handleLikeOfferSuccess, this._offer.id);
    AjaxClient.addOfferSuccessRegister(this._handleAddOfferSuccess, this._offer.id);
    
    AjaxClient.getReviews({
      offerId: this._offer.id
    });

    var $likedUsers = this._$obj.find('.offer-popup__liked-users');
    var $addedUsers = this._$obj.find('.offer-popup__added-users');

    this._likedUsersGroup = new UsersGroup({
      $obj: $likedUsers,
      title: 'нравится'
    });
    this._addedUsersGroup = new UsersGroup({
      $obj: $addedUsers,
      title: 'добавили к себе'
    });

    var $commentsBar = this._$obj.find('.comments-bar');

    this._commentsBar = new CommentsBar({
      $obj: $commentsBar,
      modifier: 'popup',
      onSubmit: this._addReview,
      onCommentDelete: this._deleteReview,
      avatarSize: 'medium',
      maxLength: this._commentMaxLength
    });
    this._commentsBar.render();

    this._$closeButton = this._$obj.find('.offer-popup__close-button');
    this._$deleteOfferButton = this._$obj.find('.offer-popup__delete-offer-button');
    this._$addButton = this._$obj.find('.offer-popup__add-button');
    this._$likeButton = this._$obj.find('.offer-popup__like-button');
    this._$commentButton = this._$obj.find('.offer-popup__comment-button');

    this._$deleteOfferButton.click(this._handleDeleteOfferButton);
    this._$closeButton.click(this._handleCloseButton);
    this._$addButton.click(this._handleAddButton);
    this._$likeButton.click(this._handleLikeButton);
    this._$commentButton.click(this._handleCommentButton);
  }
}