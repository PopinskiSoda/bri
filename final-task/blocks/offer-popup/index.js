import {addReview, getReviews, deleteReview} from 'logic/ajax-client/reviews';
import Template from './index.handlebars';
import $ from 'jquery';
import PopupBase from 'logic/popup-base';
import Comment from 'logic/comment';
import CommentsBar from 'blocks/comments-bar';

export default class OfferPopup extends PopupBase {
  constructor($obj, offer) {
    super();

    this._$obj = $obj || $('<div>').addClass('offer-popup');

    this._$closeButton = null;

    this._offer = offer || null;
    this._commentsBar = null;

    this._addReview = this._addReview.bind(this);
    this._deleteReview = this._deleteReview.bind(this);
    this._handleAddReviewSuccess = this._handleAddReviewSuccess.bind(this);
    this._handleGetReviewsSuccess = this._handleGetReviewsSuccess.bind(this);
    this._handleDeleteReviewSuccess = this._handleDeleteReviewSuccess.bind(this);
    this.close = this.close.bind(this);
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

  _init() {
    getReviews({
      offerId: this._offer.id,
      onSuccess: this._handleGetReviewsSuccess
    });

    this._$closeButton = this._$obj.find('.offer-popup__button-close');
    this._$closeButton.click(this.close);
  }
}