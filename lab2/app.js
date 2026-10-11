const express = require('express');

const logger = require('./middleware/logger');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');

const PORT = 3000;

const app = express();

// Логирование каждого запроса
app.use(logger);

// Разбор JSON из тела запроса (нужен для POST и PATCH)
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/statistics', statisticsRoutes);

// Неизвестные маршруты
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Ошибки, например некорректный JSON в теле запроса
app.use((err, req, res, next) => {
    res.status(400).json({ error: 'Invalid request' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
