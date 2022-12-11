const express = require('express');
const router = express.Router();
const API = require('../controllers/ratings');

router.get('/', API.getAllRatings);
router.put('/', API.createUpdateRating);

module.exports = router;