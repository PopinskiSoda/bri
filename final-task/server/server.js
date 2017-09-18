const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;
var offers = [];

app.route('/api/comments')
    .get(function(req, res) {
      let offer = offers[req.offerId];
      res.send(offer.comments);
    })
    .put(function(req, res) {
      let offer = offers[req.offerId];
      offer.comments.push(req)
    })
    .delete(function(req, res) {
      let offer = offers[req.offerId];
      offer.comments.filter(function(comment) {
        comment.id !== req.commentId;
      });
    });

app.route('/api/offers')
    .get(function(req, res) {
      res.send(offers);
    })
    .put(function(req, res) {
      offers.push(req.body);
      console.log(offers);
      res.sendStatus(200);
    })
    .delete(function(req, res) {
      offers = offers.filter(function(offer) {
        offer.id !== req.id;
      });
    });

app.route('/api/reviews')
    .get(function(req, res) {
      let offer = offers[req.offerId]
      res.send(offer.reviews);
    })
    .put(function(req, res) {
      let offer = offers[req.offerId]
      offer.reviews.push(req)
    })
    .delete(function(req, res) {
      let offer = offers[req.offerId]
      offer.reviews.filter(function(review) {
        review.id !== req.reviewId;
      });
    });

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});