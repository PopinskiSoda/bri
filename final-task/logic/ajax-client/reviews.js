import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';
import {getComments, deleteComment} from './comments';

const reviewsURL = `${API_URL}/reviews`;

export function getReviews(options) {
  let newOptions = Object.assign(options, {commentsURL: reviewsURL});
  getComments(newOptions);
}

export function addReview(options) {
  const {onSuccess, review, offerId} = options;
  
  $.ajax(Object.assign({
    url: reviewsURL,
    type: 'POST',
    success: onSuccess,
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
  let newOptions = Object.assign(options, {commentsURL: reviewsURL});
  getComments(newOptions);
}