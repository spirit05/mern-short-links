const { Router } = require('express');
const short = require('shortid');
const Link = require('../models/Link');
const config = require('config');
const auth = require('../middleware/auth.middleware'); //защита (доступ только для авторизованных пользователей)
const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUlr = config.get('baseUrl');
        const { to } = req.body;

        const code = short.generate();

        const existing = await Link.findOne({ to });

        if (existing) {
            return res.json({ link: existing });
        }

        const from = baseUlr + '/t/' + code;
        
        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({ link });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так попробуйте снова' });
    }
});

router.post('/remove', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.body.linkId);

        if (!link) {
            return res.status(404).json({ message: 'Ссылка не найдена!'});
        }

        await Link.deleteOne(link);
        
        res.json({ message: 'Ссылка успешно удалена!'})

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не такБ попробуйте снова!'})        
    }
})

router.get('/links', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так попробуйте снова' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так попробуйте снова' });
    }
});

module.exports = router;