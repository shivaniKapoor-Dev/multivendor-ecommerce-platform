const express = require('express');
const { searchBar } = require('../controllers/searchbar');
const router = express.Router();

router.get('/search', searchBar);

module.exports = router;
