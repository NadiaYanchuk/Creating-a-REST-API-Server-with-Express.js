const bookModel = require('../models/bookModel');
const authorModel = require('../models/authorModel');

// GET /api/books, /api/books?genre=fantasy&year=1937
function getBooks(req, res) {
    const { genre, year } = req.query;
    let result = bookModel.getAll();

    if (genre) {
        result = result.filter((book) => book.genre === genre);
    }

    if (year) {
        // Параметры запроса приходят строками, поэтому преобразуем в число
        result = result.filter((book) => book.year === Number(year));
    }

    res.json(result);
}

// GET /api/books/search?title=node
function searchBooks(req, res) {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Query parameter title is required' });
    }

    const text = title.toLowerCase();
    const result = bookModel.getAll().filter((book) => book.title.toLowerCase().includes(text));

    res.json(result);
}

// GET /api/books/:id
function getBookById(req, res) {
    const book = bookModel.getById(Number(req.params.id));

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
}

// POST /api/books
function createBook(req, res) {
    const { title, authorId, genre, year } = req.body || {};

    if (!title || !authorId || !genre || !year) {
        return res.status(400).json({ error: 'Fields title, authorId, genre and year are required' });
    }

    // Нельзя добавить книгу с несуществующим автором
    if (!authorModel.getById(authorId)) {
        return res.status(400).json({ error: 'Author not found' });
    }

    const newBook = bookModel.create({ title, authorId, genre, year });

    res.status(201).json(newBook);
}

// PATCH /api/books/:id
function updateBook(req, res) {
    const data = req.body || {};

    if (data.authorId !== undefined && !authorModel.getById(data.authorId)) {
        return res.status(400).json({ error: 'Author not found' });
    }

    const book = bookModel.update(Number(req.params.id), data);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
}

// DELETE /api/books/:id
function deleteBook(req, res) {
    const book = bookModel.remove(Number(req.params.id));

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted', book });
}

module.exports = { getBooks, searchBooks, getBookById, createBook, updateBook, deleteBook };
