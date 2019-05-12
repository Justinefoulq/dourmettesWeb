const express = require('express')
const router = express.Router()

const passport =require('passport')
const {isLoggedIn,isNotLoggedIn} = require('../lib/auth');
const pool = require('../database');


router.get('/mesInfos' , isLoggedIn, (req,res) =>{
	res.render('mesInfos');
})






/*ROUTER MES RESERVATION*/


router.get('/mesReservations/:NumClient' , isLoggedIn, async (req,res) =>{
	const{NumClient}=req.params;
	const reservation = await pool.query('SELECT * FROM reservation WHERE NumClient=?',[NumClient]);
    res.render('mesReservations' ,{ reservation} );
})



module.exports = router


