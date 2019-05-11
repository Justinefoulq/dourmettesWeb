const express = require('express')
const router = express.Router()
const pool = require('../database');

router.get('/', (req, res) =>{
  res.render('index');
})

/*ROUTE LOCATION*/


router.get('/location/:NumLoc', async (req,res) => {
	const {NumLoc} = req.params
	const location = await pool.query('SELECT * FROM location WHERE NumLoc=?',[NumLoc]);
	/*const {photos} = await pool.query('SELECT CheminPhoto FROM photo WHERE NumLoc=?'[NumLoc]);
	console.log({photos})*/
    res.render('location' ,{ location : location[0]});
});




module.exports = router
