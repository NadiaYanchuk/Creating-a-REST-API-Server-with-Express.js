const bookModel = require('../models/bookModel');
const authorModel = require('../models/authorModel');

// GET /api/statistics
function getStatistics(req, res) {
    const books = bookModel.getAll();
    const authors = authorModel.getAll();

    // Set хранит только уникальные значения
    const genres = new Set(books.map((book) => book.genre));

    // Копируем массив, чтобы сортировка не изменила исходные данные
    const sortedByYear = [...books].sort((a, b) => a.year - b.year);

    res.json({
        booksCount: books.length,
        authorsCount: authors.length,
        genresCount: genres.size,
        newestBook: sortedByYear[sortedByYear.length - 1] || null,
        oldestBook: sortedByYear[0] || null
    });
}

module.exports = { getStatistics };
