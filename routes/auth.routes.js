const { Router } = require('express');
const User = require('./models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = Router();
// /api/auth/registr
router.post(
	'/register',
	[
		check('email', 'Некоректний email').isEmail(),
		check('username', 'Введіть пароль').exists(),
		check('password', 'Мінімальна довжина паролю 6 символів')
			.isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некоректні данні при реєстрації'
				})
			}

			const { email, username, password, phone } = req.body

			const candidate =  await User.findOne({ phone })

			if (candidate) {
				return res.status(400).json({ message: 'Такий користувач вже існує' })
			}

			const candidate2 = await User.findOne({ email })

			if (candidate2) {
				return res.status(400).json({ message: 'Такий користувач вже існує' })
			}

			const hashedPassword = await bcrypt.hash(password, 12)
			const user = new User({ email, username, password: hashedPassword, phone })

			await user.save()

			res.status(201).json({ message: 'Користувач створений' })

		} catch (e) {
			res.status(500).json({ message: e + '   err' })
		}
	})

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Введіть валідний email').normalizeEmail().isEmail(),
		check('username', 'Введіть пароль').exists(),
		check('password', 'Введіть пароль').exists()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некоректні данні при вході в систему'
				})
			}

			const { email, username, password } = req.body

			const userEmail = await User.findOne({ email })
			const userName = await User.findOne({ username })

			if (!userEmail) {
				return res.status(400).json({ message: 'Користувач не знайдений' })
			}
			if (!userName) {
				return res.status(400).json({ message: 'Користувач не знайдений' })
			}

			const isMatch = await bcrypt.compare(password, userName.password)

			if (!isMatch) {
				return res.status(400).json({ message: 'Неправильний пароль, спробуйте знову' })
			}

			const token = jwt.sign(
				{ userId: userName.id },
				config.get('jwtSecret'),
				{ expiresIn: '200h' }
			)

			res.json({ token, userId: userName.id, username })

		} catch (e) {
			res.status(500).json({ message: e + "  err" })
		}
	})


	router.post(
		'/editProfile',
		async (req, res) => {
			try {
				
				const token = req.headers.authorization.split(' ')[1]
				const decoded = jwt.verify(token, config.get('jwtSecret'))
				const user = await User.findById(decoded.userId)
				const { Email, Username, Password, Phone } = req.body
				if(Email){
					User.updateOne({ _id: decoded.userId }, { email: Email }, function (err, result) {


						if (err) return console.log(err);
						console.log(result);
					});

				}
				if(Username){
					User.updateOne({ _id: decoded.userId }, { username: Username }, function (err, result) {


						if (err) return console.log(err);
						console.log(result);
					});

				}
				if(Password){
					const hashedPassword = await bcrypt.hash(Password, 12)
					User.updateOne({ _id: decoded.userId }, { password: hashedPassword }, function (err, result) {


						if (err) return console.log(err);
						console.log(result);
					});

				}
				if(Phone){
					User.updateOne({ _id: decoded.userId }, { phone: Phone }, function (err, result) {


						if (err) return console.log(err);
						console.log(result);
					});

				}
				
				


				res.json({ message :  user})
			} catch (e) {
				res.status(500).json({ message: e + "  err" })
			}
		})

module.exports = router