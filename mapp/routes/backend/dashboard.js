
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render(__path_views + 'pages/dashboard/index', { pageTitle: 'DashBoard page' });
});

// router.get('/form', function(req, res, next) {
//   console.log('This is form')
//   res.render('pages/items/form', { pageTitle: 'Item Add Page' });
// });

module.exports = router;
