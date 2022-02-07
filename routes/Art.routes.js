const { Router } = require('express');

const Art = require('./models/Art');
const User = require('./models/User');
const Rating = require('./models/Rating')
const shortid = require('shortid');

const config = require('config');
const auth = require('../middleware/auth.middleware');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { findOne } = require('./models/Art');
const router = Router();

router.post('/test',
	async (req, res) => {
	
		return res.json({ message: shortid.generate() })
	})

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
				aviable,
				type
			} = req.body
			const art = new Art({
				way,
				prise,
				size,
				firstMention,
				title,
				describe,
				aviable,
				type
			})


			await art.save()
			return res.json({ message: "art succesful add" })
		} catch (e) {
			res.status(500).json({ message: e + "   eror" })

		}
	})
router.post('/detail/:id', async (req, res) => {
	try {
		const art = await Art.findById(req.params.id)
		res.json(art)
	} catch (e) {
		res.status(500).json({ message: e + '       err' })
	}
})
router.post('/all', async (req, res) => {
	try {
		let {
			firstMention,
			type,
			limit,
			page,
			sortByPrise,
			sortByTitle
		} = req.body
		page = page || 1
		limit = limit || 9
		let offset = page * limit - limit
		let art;

		if (!firstMention.length && !type.length) {

			//art = await Art.find().sort({title: 0}).limit(limit).skip(offset)
			if (sortByTitle) {
				art = await Art.find().sort({ title: "asc" }).limit(limit).skip(offset)
			}
			else if (sortByPrise) {
				art = await Art.find().sort({ prise: "asc" }).limit(limit).skip(offset)
			}
			else {
				art = await Art.find().limit(limit).skip(offset)
			}
		}
		if (firstMention.length && !type.length) {
			//	art = await Art.find({ firstMention: { $in: req.body.firstMention } }).limit(limit).skip(offset)
			if (sortByTitle) {
				art = await Art.find({ firstMention: { $in: req.body.firstMention } }).sort({ title: "asc" }).limit(limit).skip(offset)

			}
			else if (sortByPrise) {
				art = await Art.find({ firstMention: { $in: req.body.firstMention } }).sort({ prise: "asc" }).limit(limit).skip(offset)

			}
			else {
				art = await Art.find({ firstMention: { $in: req.body.firstMention } }).limit(limit).skip(offset)

			}
		}
		if (!firstMention.length && type.length) {

			//art = await Art.find({ type: { $in: req.body.type } }).limit(limit).skip(offset)
			if (sortByTitle) {
				art = await Art.find({ type: { $in: req.body.type } }).sort({ title: "asc" }).limit(limit).skip(offset)

			}
			else if (sortByPrise) {
				art = await Art.find({ type: { $in: req.body.type } }).sort({ prise: "asc" }).limit(limit).skip(offset)

			}
			else {
				art = await Art.find({ type: { $in: req.body.type } }).limit(limit).skip(offset)

			}
		}
		if (firstMention.length && type.length) {
			//art = await Art.find({ firstMention: { $in: req.body.firstMention }, type: { $in: req.body.type } }).limit(limit).skip(offset)
			if (sortByTitle) {
				art = await Art.find({ firstMention: { $in: req.body.firstMention }, type: { $in: req.body.type } }).sort({ title: "asc" }).limit(limit).skip(offset)

			}
			else if (sortByPrise) {
				art = await Art.find({ firstMention: { $in: req.body.firstMention }, type: { $in: req.body.type } }).sort({ prise: "asc" }).limit(limit).skip(offset)

			}
			else {
				art = await Art.find({ firstMention: { $in: req.body.firstMention }, type: { $in: req.body.type } }).limit(limit).skip(offset)

			}
		}

		return res.json(art)

		// const art = await Art.find()
		res.json(art)
	} catch (e) {
		res.status(500).json({ message: e + '       err' })
	}
})


router.post('/addRating/:id', auth, async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
		const decoded = jwt.verify(token, config.get('jwtSecret'))
		const {
			"eval": rate
		} = req.body
		const userId = decoded.userId
		const artId = req.params.id
		const  id= shortid.generate()
		const rateChange = await Rating.find({userId:decoded.userId, artId:req.params.id})
		if(rateChange.length){
		Rating.updateOne({userId:decoded.userId, artId:req.params.id},
			{
				"rate": rate
			},
			function (err, result) {
				if (err) return console.log(err);
				console.log(result);
			});
			res.status(200).json({ message: 'goood1' })
		}
		else{
		const rates = new Rating({
			id,
			rate,
			artId,
			userId
		})
		await rates.save()
		User.updateOne({ _id: decoded.userId },
			{
				$push: { myRating: id}
			},
			function (err, result) {
				if (err) return console.log(err);
				console.log(result);
			});
		res.status(200).json({ message: 'goood' })
		}
	} catch (e) {
		res.status(500).json({ message: e + '     err' })
	}
})


router.get('/getRating/:id', async (req, res) => {
	try {

	
		const art = req.params.id
					
		const rate = await Rating.find({ artId: art })

		res.status(200).json({rate})
		
	} catch (e) {
		res.status(500).json({ message: e + '     err' })
	}
})


router.post('/search', async (req, res) => {
	try {
		const title = String(req.body.title)
		const art = await Art.find({ "title": { "$regex": title, "$options": "i" } })




		res.json(art)
	} catch (e) {
		res.status(500).json({ message: e + '       err' })
	}
})


router.post('/getQuantity', async (req, res) => {
	try {

		let {
			firstMention,
			type
		} = req.body

		let artCount

		if (!firstMention.length && !type.length) {
			// art = await Art.findAndCountAll({limit, offset})
			artCount = await Art.find().count()
			
		  }
		  if (firstMention.length && !type.length) {
			// art = await Art.findAndCountAll({where:{brandId}, limit, offset})
			artCount = await Art.find({ firstMention: { $in: req.body.firstMention } }).count()
		  }
		  if (!firstMention.length && type.length) {
			//art = await Art.findAndCountAll({where:{typeId}, limit, offset})
			artCount = await Art.find({ type: { $in: req.body.type } }).count()
		  }
		  if (firstMention.length && type.length) {
			//art = await Art.findAndCountAll({where:{typeId, brandId}, limit, offset})
			artCount = await Art.find({ firstMention: { $in: req.body.firstMention }, type: { $in: req.body.type } }).count()
		  }

		res.status(200).json(artCount)
		
	} catch (e) {
		res.status(500).json({ message: e + '     err' })
	}
})

module.exports = router