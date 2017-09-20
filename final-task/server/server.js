const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const ROOT_DIR = '../public';
const OFFERS_FILENAME = './offers.json';

const PORT = 3000;

const MAX_COMMENTS_PER_RESPONCE = 5;
const MAX_REVIEWS_PER_RESPONCE = 3;

const app = express();

app.use(express.static(ROOT_DIR));
app.use(cookieParser());
app.use(bodyParser.json());

var offers = JSON.parse(fs.readFileSync(OFFERS_FILENAME, 'utf8'));

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

      res.status(200).json(getTopComments(offer));
    })
    .delete(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      offer.comments.filter(function(comment) {
        comment.id !== req.body.id;
      });
    });

app.route('/api/reviews')
    .get(function(req, res) {
      let offer = getOfferById(req.query.offerId);

      res.status(200).json(getTopReviews(offer));
    })
    .post(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      offer.reviews.push(req.body.review);

      res.status(200).json(getTopReviews(offer));
    })
    .delete(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      offer.reviews.filter(function(review) {
        review.id !== req.body.id;
      });
    });

app.route('/api/offers')
    .get(function(req, res) {
      res.status(200).json(offers);
    })
    .post(function(req, res) {
      offers.push(req.body);
      res.json(200);
    })
    .delete(function(req, res) {
      offers = offers.filter(function(offer) {
        offer.id !== req.body.id;
      });
    });

app.route('/api/like')
    .post(function(req, res) {
      let offer = getOfferById(req.body.offerId);
      offer.likedUsers.push({});
      res.status(200).json(offer.likedUsers)
    });
    // .get(function(req, res)) {
    //   let offer = getOfferById(req.query.id);
    //   res.status(200).json(offer.likedUsers)
    // }

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});