const { Router } = require('express');

const Art = require('./models/Art');
const User = require('./models/User');
const Rating = require('./models/Rating')
const shortid = require('shortid');
const Favourite = require('./models/Favourite')

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
    '/add/:id',
    auth,
    async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
            const user = jwt.verify(token, config.get('jwtSecret')).userId
            const art = req.params.id

            const test = await Favourite.find({"user": user}).count()
            if (!test) {
                const fav = new Favourite({
                    art,
                    user
                })
                await fav.save()
                return res.json({ message: "create"})
            }
            else {
                 Favourite.updateOne({ "user": user },
                    {
                        $push: { "art": art}
                    },
                    function (err, result) {
                        if (err) return console.log(err);
                        console.log(result);
                    });
                 return res.json({ message: "added" })
            }
         
         
            
        } catch (e) {
            res.status(500).json({ message: e + "   eror" })

        }
    })
router.post(
    '/remove/:id',
    auth,
    async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
            const user = jwt.verify(token, config.get('jwtSecret')).userId
            const art = req.params.id

            Favourite.updateOne({ "user": user },
            {
                $pull: { "art": art}
            },
            function (err, result) {
                if (err) return console.log(err);
                console.log(result);
            });
         return res.json({ message: "remove" })
        } catch (e) {
            res.status(500).json({ message: e + "   eror" })

        }
    })


    router.get(
        '/',
        auth,
        async (req, res) => {
            try {
                const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
                const user = jwt.verify(token, config.get('jwtSecret')).userId
             
              const userFavouriteID = await Favourite.find({"user": user})
              const userFavourite= await Art.find({ "_id": { $in: userFavouriteID[0].art } })

             return res.json(userFavourite)
            } catch (e) {
                res.status(500).json({ message: e + "   eror" })
    
            }
        })
        router.get(
            '/id',
            auth,
            async (req, res) => {
                try {
                    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
                    const user = jwt.verify(token, config.get('jwtSecret')).userId
                 
                  const userFavouriteID = await Favourite.find({"user": user})
                  //const userFavourite= await Art.find({ "_id": { $in: userFavouriteID[0].art } })
    
                 return res.json(userFavouriteID[0].art)
                } catch (e) {
                    res.status(500).json({ message: e + "   eror" })
        
                }
            })
module.exports = router