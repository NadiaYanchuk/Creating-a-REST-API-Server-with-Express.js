// Возвращает дату и время в формате DD.MM.YYYY HH:MM
function formatDateTime(date) {
    const pad = (value) => String(value).padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function logger(req, res, next) {
    console.log(`${req.method} | ${req.originalUrl} | ${formatDateTime(new Date())}`);

    // Передаём управление следующему обработчику
    next();
}

module.exports = logger;
