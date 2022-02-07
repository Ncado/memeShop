const { Router } = require('express');
const Coment = require("./models/Comment")
const config = require('config');
const User = require('./models/User');
const auth = require('../middleware/auth.middleware');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = Router();
// /api/coment/add
router.post(
	'/add',
	auth,
	async (req, res) => {
		try {
			const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
		const decoded = jwt.verify(token, config.get('jwtSecret'))
			const {
				text,
				art 
			} = req.body

			const userData =  await User.findById(decoded.userId)
			const userName = userData["username"]
const userid= decoded.userId
			const coment = new Coment({
				text,
				userid,
				userName,
				art 
            })
			await coment.save()

			return res.json(coment)

		} catch (e) {
			res.status(500).json({ message: e + '   err' })
		}
	})
router.get(
	'/getComments',

	async (req, res) => {
		try {
		    const artId = req.body
			const comments =  await Coment.find({art: req.body.artId})
			return res.json(comments)

		} catch (e) {
			res.status(500).json({ message: e + '   err' })
		}
	})

module.exports = router