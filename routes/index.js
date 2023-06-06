const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Movies = require('../models/Movie.model');
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-cinema";

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/movies', (req, res, next) => {
mongoose
  .connect(MONGO_URI)
  .then(()=> 
    Movies.find({})
  )
  .then(item => 
    res.render('movies', {item})
    ) 
  .then(()=> 
  mongoose.connection.close()
  )
  .catch((err) => {
        console.error("Error connecting to mongo: ", err)
    })
})

router.get('/movie/:id', (req, res, next) => {
    mongoose
      .connect(MONGO_URI)
      .then(()=> 
      Movies.findById(req.params.id)
      )
      .then(item => 
        res.render('moviebyid', item)
        ) 
      .then(()=> 
      mongoose.connection.close()
      )
      .catch((err) => {
        console.error("Error connecting to mongo: ", err)
    })
})

module.exports = router;