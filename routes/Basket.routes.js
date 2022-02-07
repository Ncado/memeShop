const { Router } = require('express');

const Art = require('./models/Art');
const Art = require('./models/Art');


//const config = require('config');
const auth = require('../middleware/auth.middleware');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = Router();


router.post(
    '/add',
    async (req, res) => {
        try {
            const {
                way,
                prise,
                size,
                firstMention,
                title,
                describe,
                aviable
            } = req.body
            const art = new Art({
                way,
                prise,
                size,
                firstMention,
                title,
                describe,
                aviable
            })
            await art.save()
			return res.json({ message: "art succesful add" })
        } catch (e) {
            res.status(500).json({ message: e + "   eror" })

        }
    })
    router.post('/get', async (req, res) => {
        try {
            const art = await Art.findById(req.params.id)
            res.json(art)
        } catch (e) {
            res.status(500).json({ message: 'Щось пішло не так спробуйте знову' })
        }
    })
    router.get('/buy',  async (req, res) => {
        try {
            const art = await Art.find()
            res.json(art)
        } catch (e) {
            res.status(500).json({ message: 'Щось пішло не так спробуйте знову' })
        }
    })


    router.get('/delete',  async (req, res) => {
        try {
            const art = await Art.find()
            res.json(art)
        } catch (e) {
            res.status(500).json({ message: 'Щось пішло не так спробуйте знову' })
        }
    })
    module.exports = router