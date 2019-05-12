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







router.get('/ajoutClient', (req, res)=> {
  res.render('admin/ajoutClient')
})

router.post('/ajoutClient', async (req, res)=> {
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
  console.log(newClient)
  await pool.query('INSERT INTO client set ?', [newClient])
  req.flash('success','ajout Client réussie');
  res.redirect('/admin/listeclient')
})


router.get('/Commander/:idS/:idC', isLoggedIn, async (req, res)=> {
	const {idS, idC} = req.params;
	
	console.log(idS);
	console.log(idC);
	await pool.query('INSERT INTO commande (DateCommande, IdClient, IdShamp, IdAdmin, ComEncours, ComAccept, ComRef) VALUES (?, ?, ?, ?, ?, ?, ?)',[date,idC,idS,1,1,0,0]);
	req.flash('success', 'Commande réussi');
	res.redirect('/');
})















module.exports = router