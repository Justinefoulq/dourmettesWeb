const express = require('express')
const router = express.Router()

const passport =require('passport')
const {isLoggedIn,isNotLoggedIn,isGoodClient} = require('../lib/auth');
const pool = require('../database');


router.get('/mesInfos' , isLoggedIn, (req,res) =>{
	res.render('mesInfos');
})

router.post('/mesInfos/:NumClient',isLoggedIn,isGoodClient, async(req,res)=>{
  const {NumClient}=req.params;
  const { MailClient , NomClient , PrenomClient , NumRueClient , RueClient , CodePostalClient , VilleClient , PaysClient , NumTelClient , MdpClient } = req.body;
  const newClient = {
    MailClient,
    NomClient,
    PrenomClient,
    NumRueClient,
    RueClient ,
    CodePostalClient ,
    VilleClient ,
    PaysClient ,
    NumTelClient ,
    MdpClient
  };
 
 await pool.query('UPDATE client set ? WHERE NumClient = ?', [newClient,NumClient]);
 req.flash('success','Vos infos sont modifiées');
 res.redirect('/');

})






/*ROUTER MES RESERVATION*/


router.get('/mesReservations/:NumClient' , isGoodClient, isLoggedIn, async (req,res) =>{
	const{NumClient}=req.params;
	const reservationValide = await pool.query('SELECT R.NumResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM reservation R, effectue E , location L WHERE NumClient=? AND E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaValid=1',[NumClient]);
	console.log(reservationValide)
	const reservationAttente = await pool.query('SELECT R.NumResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM reservation R, effectue E , location L WHERE NumClient=? AND E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaAttente=1',[NumClient]);
	const reservationRefus = await pool.query('SELECT R.NumResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM reservation R, effectue E , location L WHERE NumClient=? AND E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaRefus=1',[NumClient]);
    res.render('mesReservations' ,{ reservationValide,reservationAttente,reservationRefus} );
})





module.exports = router


