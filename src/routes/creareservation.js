const express = require('express')
const router = express.Router()

const passport =require('passport')
const {isLoggedIn,isNotLoggedIn} = require('../lib/auth');
const pool = require('../database');





/*CREATION RESERVATION*/ 

router.post('/creareservation/:NumClient/:NumLoc', isLoggedIn, async (req, res)=> {
	const{NumClient,NumLoc }= req.params;
	console.log(NumClient);
	console.log(NumLoc);
	const {NumSemaine,NbPersResa} =req.body;
	console.log(NumSemaine);
	console.log(NbPersResa);

	await pool.query('INSERT INTO reservation (NbPersResa, NumClient, NumLoc, ResaValid, ResaAttente, ResaRefus) VALUES (?, ?, ?, ?, ?, ?)',[NbPersResa,NumClient,NumLoc,0,1,0]);
	const NbResa = await pool.query('SELECT count(NumResa) AS IdResa FROM reservation')
	console.log(NbResa);
	console.log(NbResa[0].IdResa);



	await pool.query('INSERT INTO effectue (NumResa,NumLoc,NumSemaine) VALUES (?,?,?)',[ NbResa[0].IdResa ,NumLoc,NumSemaine]);
	req.flash('success', 'Demande de Reservation réussi');
	res.redirect('/');

})













module.exports = router