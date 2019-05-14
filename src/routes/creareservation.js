const express = require('express')
const router = express.Router()

const passport =require('passport')
const {isLoggedIn,isNotLoggedIn,isGoodClientResa} = require('../lib/auth');
const pool = require('../database');





/*CREATION RESERVATION*/ 

router.post('/creareservation/:NumClient/:NumLoc',isGoodClientResa, isLoggedIn, async (req, res)=> {
	const{NumClient,NumLoc }= req.params;
	const {NumSemaine,NbPersResa} =req.body;
	
	await pool.query('INSERT INTO reservation (NbPersResa, NumClient, NumLoc, ResaValid, ResaAttente, ResaRefus) VALUES (?, ?, ?, ?, ?, ?)',[NbPersResa,NumClient,NumLoc,0,1,0]);
	const NbResa = await pool.query('SELECT count(NumResa) AS IdResa FROM reservation')

	await pool.query('INSERT INTO effectue (NumResa,NumLoc,NumSemaine) VALUES (?,?,?)',[ NbResa[0].IdResa ,NumLoc,NumSemaine]);
	req.flash('success', 'Demande de Reservation réussie');
	res.redirect('/location/'+NumLoc);

})













module.exports = router