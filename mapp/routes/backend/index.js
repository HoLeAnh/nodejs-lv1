var express = require('express');
var router = express.Router();


router.use('/dashboard', require('./dashboard'));
router.use('/items', require('./items'));
router.use('/projects', require('./projects'));
router.use('/features', require('./features'));
router.use('/testcases', require('./testcases'));
router.use('/accounts', require('./accounts'));

module.exports = router;

