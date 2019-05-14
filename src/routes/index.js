const express = require('express')
const router = express.Router()
const pool = require('../database');

router.get('/', async(req, res) =>{

  res.render('index',);
})

/*ROUTE ACCESS*/

router.get('/acces', async (req,res) => {
	res.render('acces')
});

router.get('/Error', (req, res)=> {
  res.render('Error')
})

router.get('/visites', async (req,res) => {
	const visites= await pool.query('SELECT * FROM visite')
	res.render('visites' , {visites})
});










module.exports = router
