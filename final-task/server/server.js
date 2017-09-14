const express = require('express');
const app = express();

const PORT = 3000;

// app.get('/', function(req, res) {
//   res.send('Hello World');
// });

app.route('/api')
  .route('/comments')
    .get(function(req, res) {
      res.send('kek');
    })
    .put(function(req, res) {

    })
    .delete(function(req, res) {

    })
  .route('/offers')
    .get(function(req, res) {
      res.send('kek');
    })
    // .put(function(req, res) {

    // })
    .delete(function(req, res) {

    })
  .route('/reviews')
    .get(function(req, res) {
      res.send('kek');
    })
    .put(function(req, res) {

    })
    .delete(function(req, res) {

    });

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});