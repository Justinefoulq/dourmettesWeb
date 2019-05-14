const express = require('express')
const router = express.Router()

const passport =require('passport')
const {isLoggedIn,isNotLoggedIn} = require('../lib/auth');
const pool = require('../database');




/*ROUTE LOCATION*/


router.get('/location/:NumLoc', async (req,res) => {
	const {NumLoc} = req.params
	const location = await pool.query('SELECT * FROM location WHERE NumLoc=?',[NumLoc]);
	const photos = await pool.query('SELECT CheminPhoto FROM photo WHERE NumLoc=?',[NumLoc]);
	const semdispo = await pool.query('SELECT * FROM semaine S WHERE S.NumSemaine NOT IN (SELECT E.NumSemaine FROM effectue E, reservation R WHERE R.NumResa=E.NumResa AND R.ResaRefus!=1 AND E.NumLoc=?)',[NumLoc]);
	const saison =await pool.query('SELECT S.NumSaison , S.LibSaison , S.SemDebutSaison, S.SemFinSaison ,T.PrixSemaine, T.SuplementNbPersSup4 FROM saison S, tarif T,applique A WHERE A.NumSaison=S.NumSaison AND T.NumTarif=A.NumTarif AND A.NumLoc=?',[NumLoc]);
   
    res.render('location' ,{ location : location[0], photos,semdispo,saison});
});











module.exports = router;