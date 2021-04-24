const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.auhtorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ meassage: 'Не авторизованный доступ!' });
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded;

        next();

    } catch (e) {
        res.status(401).json({ meassage: 'Не авторизованный доступ!' });
    }
}