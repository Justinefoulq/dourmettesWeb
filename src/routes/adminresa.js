const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');

const pool = require('../database')


/* ROUTE LISTE RESERVATION */ 
router.get('/listeReservation',isAdmin, async (req,res) => {
  const reservationValide = await pool.query('SELECT R.NumClient,R.NumResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM reservation R, effectue E , location L WHERE  E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaValid=1');
  const reservationAttente = await pool.query('SELECT R.NumClient,R.NumResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM reservation R, effectue E , location L WHERE  E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaAttente=1');
  const reservationRefuse = await pool.query('SELECT R.NumClient,R.NumResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM reservation R, effectue E , location L WHERE  E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaRefus=1');
  console.log(reservationValide)
  

  res.render('admin/listeReservation' ,{ reservationValide,reservationAttente,reservationRefuse } );

});

/* VALIDER UNE REERVATION */ 

router.get('/valideResa/:NumResa',isAdmin, async (req,res)=>{
	const {NumResa}=req.params;
	await pool.query('UPDATE reservation SET ResaValid=1, ResaAttente=0 WHERE NumResa=?',NumResa);
	req.flash('success', 'Réservation n° '+NumResa+ ' validé');
	res.redirect('/admin/listeReservation');
})


router.get('/refusResa/:NumResa',isAdmin, async (req,res)=>{
	const {NumResa}=req.params;
	await pool.query('UPDATE reservation SET ResaRefus=1, ResaAttente=0 WHERE NumResa=?',NumResa);
	req.flash('success', 'Réservation n° '+NumResa+ ' refusé');
	res.redirect('/admin/listeReservation');
})




/*GESTION RESERVATION */ 

/*router.get('/refus/:NumResa',async (req,res)=>{
  const {NumResa} = req.params;
  const etatResaInitial= await pool.query('SELECT ')

  await pool.query ('DELETE FROM Reser WHERE NumClient=?',[NumClient]);
  req.flash('success','Reservation Refusé');
  res.redirect('/admin/listeclient');

})*/



module.exports = router