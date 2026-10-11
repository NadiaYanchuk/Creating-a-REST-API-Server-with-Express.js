const books = [
    { id: 1, title: 'The Hobbit', authorId: 1, genre: 'fantasy', year: 1937 },
    { id: 2, title: '1984', authorId: 2, genre: 'dystopia', year: 1949 },
    { id: 3, title: 'The Lord of the Rings', authorId: 1, genre: 'fantasy', year: 1954 },
    { id: 4, title: 'Animal Farm', authorId: 2, genre: 'satire', year: 1945 },
    { id: 5, title: 'Clean Architecture', authorId: 3, genre: 'programming', year: 2017 },
    { id: 6, title: 'Node.js Design Patterns', authorId: 4, genre: 'programming', year: 2014 }
];

function getAll() {
    return books;
}

function getById(id) {
    return books.find((book) => book.id === id);
}

function getByAuthorId(authorId) {
    return books.filter((book) => book.authorId === authorId);
}

function create(data) {
    // Новый id = самый большой id + 1
    const maxId = books.reduce((max, book) => Math.max(max, book.id), 0);

    const newBook = {
        id: maxId + 1,
        title: data.title,
        authorId: data.authorId,
        genre: data.genre,
        year: data.year
    };

    books.push(newBook);
    return newBook;
}

function update(id, data) {
    const book = getById(id);

    if (!book) {
        return null;
    }

    // Меняем только те поля, которые пришли в запросе
    if (data.title !== undefined) book.title = data.title;
    if (data.authorId !== undefined) book.authorId = data.authorId;
    if (data.genre !== undefined) book.genre = data.genre;
    if (data.year !== undefined) book.year = data.year;

    return book;
}

function remove(id) {
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        return null;
    }

    // splice возвращает массив удалённых элементов
    return books.splice(index, 1)[0];
}

module.exports = { getAll, getById, getByAuthorId, create, update, remove };
