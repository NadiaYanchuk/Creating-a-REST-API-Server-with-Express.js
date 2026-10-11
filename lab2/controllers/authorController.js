const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');

// GET /api/authors
function getAuthors(req, res) {
    res.json(authorModel.getAll());
}

// GET /api/authors/:id
function getAuthorById(req, res) {
    const author = authorModel.getById(Number(req.params.id));

    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
}

// GET /api/authors/:id/books
function getAuthorBooks(req, res) {
    const author = authorModel.getById(Number(req.params.id));

    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }

    res.json(bookModel.getByAuthorId(author.id));
}

module.exports = { getAuthors, getAuthorById, getAuthorBooks };
