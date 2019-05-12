const express = require('express')
const router = express.Router()
const pool = require('../database');

router.get('/', (req, res) =>{
  res.render('index');
})

/*ROUTE ACCESS*/

router.get('/acces', async (req,res) => {
	res.render('acces')
});








module.exports = router
