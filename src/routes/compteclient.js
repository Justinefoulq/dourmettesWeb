const express = require('express')
const router = express.Router()
const helpers = require('../lib/helpers');
const passport =require('passport')
const {isLoggedIn,isNotLoggedIn,isGoodClient,isGoodClientAnnulerResa} = require('../lib/auth');
const pool = require('../database');


/* MODIFIER INFOS CLIENT */ 


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
  newClient.MdpClient = await helpers.encryptPassword(MdpClient);
 
 await pool.query('UPDATE client set ? WHERE NumClient = ?', [newClient,NumClient]);
 req.flash('success','Vos infos sont modifiées');
 res.redirect('/');

})






/*ROUTER MES RESERVATION*/


router.get('/mesReservations/:NumClient' , isGoodClient, isLoggedIn, async (req,res) =>{
	const{NumClient}=req.params;
	const reservationValide = await pool.query('SELECT R.NumResa,NumClient,R.DateResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM  reservation R, effectue E , location L WHERE NumClient=? AND E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaValid=1',[NumClient]);
	const reservationAttente = await pool.query('SELECT R.NumResa,NumClient,R.DateResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM reservation R, effectue E , location L WHERE NumClient=? AND E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaAttente=1',[NumClient]);
	const reservationRefus = await pool.query('SELECT R.NumResa,NumClient, R.NbPersResa,R.DateResa, E.NumSemaine, L.LibeleLoc FROM reservation R, effectue E , location L WHERE NumClient=? AND E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaRefus=1',[NumClient]);
    res.render('mesReservations' ,{ reservationValide,reservationAttente,reservationRefus} );
})




/*ANNULATION RESERVATION CLIENT */ 



router.get('/annulerResa/:NumResa/:NumClient', isGoodClientAnnulerResa ,isLoggedIn, async (req,res)=>{
  const {NumResa,NumClient}=req.params;
  await pool.query('UPDATE reservation SET ResaRefus=1, ResaAttente=0 WHERE NumResa=?',[NumResa]);
  req.flash('message', 'Vous avez annulé la réservation n° '+NumResa);
  res.redirect('/mesReservations/'+NumClient);
})




module.exports = router


