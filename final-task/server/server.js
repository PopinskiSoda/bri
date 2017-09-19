const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const ROOT_DIR = '../public';


app.use(express.static(ROOT_DIR));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   res.setHeader("Content-Type", "application/json");
//   return next();
// });

const PORT = 3000;

const MAX_COMMENTS_PER_RESPONCE = 5;
const MAX_REVIEWS_PER_RESPONCE = 3;

var offers = [{id: 1, comments:[], reviews:[]}];

function getOfferById(id) {
  return offers.find(function(offer) {
    return offer.id == id;
  });
}

function getTopReviews(offer) {
  return offer.reviews.slice(-MAX_REVIEWS_PER_RESPONCE);
}

function getTopComments(offer) {
  return offer.comments.slice(-MAX_COMMENTS_PER_RESPONCE);
}

app.route('/api/comments')
    .get(function(req, res) {
      let offer = getOfferById(req.query.offerId);

      res.status(200).json(getTopComments(offer));
    })
    .post(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      
      offer.comments.push(req.body.comment);
      
      // console.log('--------------');
      // // console.log(offers);
      // // console.log(offer);
      // console.log(offer.comments);
      // console.log('--------------');

      res.status(200).json(getTopComments(offer));
    })
    .delete(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      offer.comments.filter(function(comment) {
        comment.id !== req.commentId;
      });
    });

app.route('/api/offers')
    .get(function(req, res) {
      res.json(offers);
    })
    .post(function(req, res) {
      offers.push(req.body);
      res.json(200);
    })
    .delete(function(req, res) {
      offers = offers.filter(function(offer) {
        offer.id !== req.id;
      });
    });

app.route('/api/reviews')
    .get(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      res.json(offer.reviews);
    })
    .post(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      offer.reviews.push(req.body.review);
    })
    .delete(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      offer.reviews.filter(function(review) {
        review.id !== req.reviewId;
      });
    });

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});