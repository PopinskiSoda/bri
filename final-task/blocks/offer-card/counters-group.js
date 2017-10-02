import Counter from 'blocks/counter';
import * as AjaxClient from 'logic/ajax-client';

export default class CountersGroup {
  
  constructor(options) {
    this._$obj = options.$obj || $('<div>').addClass('offer-card__counters-group');
    this._offerId = options.offerId || null;

    this._counters = {};

    this._counters.likedCounter = new Counter({
      $obj: this._$obj.find('.offer-card__liked-counter'),
      amount: options.likedAmount,
      title: 'нравится'
    });

    this._counters.commentsCounter = new Counter({
      $obj: this._$obj.find('.offer-card__comments-counter'),
      amount: options.commentsAmount,
      title: 'комментарий',
      declinedTitle: 'комментария',
      declinedPluralTitle: 'комментариев'
    });

    this._counters.reviewsCounter = new Counter({
      $obj: this._$obj.find('.offer-card__reviews-counter'),
      amount: options.reviewsAmount,
      title: 'отзыв',
      declinedTitle: 'отзыва',
      declinedPluralTitle: 'отзывов'
    });

    this._counters.addedCounter = new Counter({
      $obj: this._$obj.find('.offer-card__added-counter'),
      amount: options.addedAmount,
      title: 'добавил себе',
      declinedTitle: 'добавили себе',
      declinedPluralTitle: 'добавили себе'
    });

    for (let key in this._counters) {
      if (this._counters.hasOwnProperty(key)) {
        this._counters[key].appendTo(this._$obj);
      }
    }

    this._handleLikeOfferSuccess = this._handleLikeOfferSuccess.bind(this);
    this._handleAddOfferSuccess = this._handleAddOfferSuccess.bind(this);
    this._handleChangeCommentsSuccess = this._handleChangeCommentsSuccess.bind(this);
    this._handleChangeReviewsSuccess = this._handleChangeReviewsSuccess.bind(this);

    AjaxClient.likeOfferSuccessRegister(this._handleLikeOfferSuccess, this._offerId);
    AjaxClient.addOfferSuccessRegister(this._handleAddOfferSuccess, this._offerId);
    AjaxClient.changeCommentsSuccessRegister(this._handleChangeCommentsSuccess, this._offerId);
    AjaxClient.changeReviewsSuccessRegister(this._handleChangeReviewsSuccess, this._offerId);
  }

  _handleLikeOfferSuccess(newLikedUsers) {
    this._counters.likedCounter.setAmount(newLikedUsers.length);
    this._counters.likedCounter.render();
  }

  _handleAddOfferSuccess(newAddedUsers) {
    this._counters.addedCounter.setAmount(newAddedUsers.length);
    this._counters.addedCounter.render();
  }

  _handleChangeCommentsSuccess(commentsData) {
    this._counters.commentsCounter.setAmount(commentsData.total);
    this._counters.commentsCounter.render();
  }

  _handleChangeReviewsSuccess(reviewsData) {
    this._counters.reviewsCounter.setAmount(reviewsData.total);
    this._counters.reviewsCounter.render();
  }

  render() {
    for (let key in this._counters) {
      if (this._counters.hasOwnProperty(key)) {
        this._counters[key].render();
      }
    }
  }
}