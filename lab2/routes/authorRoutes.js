const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.get('/', authorController.getAuthors);
router.get('/:id', authorController.getAuthorById);
router.get('/:id/books', authorController.getAuthorBooks);

module.exports = router;
