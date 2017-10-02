import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';
import {callHandlers} from './ajax-utils';
import {getComments, deleteComment} from './comments';

const reviewsURL = `${API_URL}/reviews`;

var
  getReviewsSuccessHandlers = [],
  addReviewSuccessHandlers = [],
  deleteReviewSuccessHandlers = [];

export function getReviewsSuccessRegister(handler, offerId) {
  getReviewsSuccessHandlers.push({handler, offerId});
}

export function addReviewSuccessRegister(handler, offerId) {
  addReviewSuccessHandlers.push({handler, offerId});
}

export function deleteReviewSuccessRegister(handler, offerId) {
  deleteReviewSuccessHandlers.push({handler, offerId});
}

export function changeReviewsSuccessRegister(handler, offerId) {
  getReviewsSuccessRegister(handler, offerId);
  addReviewSuccessRegister(handler, offerId);
  deleteReviewSuccessRegister(handler, offerId);
}

export function getReviews(options) {
  let newOptions = Object.assign(options, {
    commentsURL: reviewsURL,
    success: callHandlers(getReviewsSuccessHandlers, options.offerId)
  });
  getComments(newOptions);
}

export function addReview(options) {
  const {review, offerId} = options;
  
  $.ajax(Object.assign({
    url: reviewsURL,
    type: 'POST',
    success: callHandlers(addReviewSuccessHandlers), offerId,
    data: JSON.stringify({
      review: {
        text: review.text,
        user: review.user
      },
      offerId
    })
  }, REQUEST_HEADERS));
}

export function deleteReview(options) {
  let newOptions = Object.assign(options, {
    commentsURL: reviewsURL,
    success: callHandlers(deleteReviewSuccessHandlers, options.offerId)
  });
  deleteComment(newOptions);
}