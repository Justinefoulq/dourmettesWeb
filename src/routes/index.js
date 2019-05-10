const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
  res.render('index');
})

/*ROUTE LOCATION*/

router.get('/location', (req, res) =>{
  res.render('location');
})


module.exports = router
