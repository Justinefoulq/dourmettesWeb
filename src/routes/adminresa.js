const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');

const pool = require('../database')


/* ROUTE LISTE RESERVATION */ 
router.get('/listeReservation',isAdmin, async (req,res) => {
  const reservationValide = await pool.query('SELECT R.NumClient,C.PrenomClient,C.NomClient,R.NumResa,R.DateResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM client C, reservation R, effectue E , location L WHERE C.NumClient=R.NumClient AND  E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaValid=1 ORDER BY R.NumResa DESC' );
  console.log(reservationValide)
  const reservationAttente = await pool.query('SELECT R.NumClient,C.PrenomClient,C.NomClient,R.NumResa,R.DateResa, R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM client C,reservation R, effectue E , location L WHERE C.NumClient=R.NumClient AND E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaAttente=1 ORDER BY R.NumResa DESC');
  const reservationRefuse = await pool.query('SELECT R.NumClient,C.PrenomClient,C.NomClient,R.NumResa, R.DateResa,R.NbPersResa, E.NumSemaine, L.LibeleLoc FROM client C,reservation R, effectue E , location L WHERE C.NumClient=R.NumClient AND E.NumResa=R.NumResa AND L.NumLoc=E.NumLoc AND ResaRefus=1 ORDER BY R.NumResa DESC ');
  console.log(reservationValide)
  

  res.render('admin/listeReservation' ,{ reservationValide,reservationAttente,reservationRefuse } );

});

/* VALIDER UNE REERVATION */ 

router.get('/valideResa/:NumResa',isAdmin, async (req,res)=>{
	const {NumResa}=req.params;
	await pool.query('UPDATE reservation SET ResaValid=1, ResaAttente=0 WHERE NumResa=?',NumResa);
	req.flash('success', 'Réservation n° '+NumResa+ ' validée');
	res.redirect('/admin/listeReservation');
})

/* REFUSER UNE REERVATION */ 

router.get('/refusResa/:NumResa',isAdmin, async (req,res)=>{
	const {NumResa}=req.params;
	await pool.query('UPDATE reservation SET ResaRefus=1, ResaAttente=0 WHERE NumResa=?',NumResa);
	req.flash('message', 'Réservation n° '+NumResa+ ' refusée');
	res.redirect('/admin/listeReservation');
})

/* AJOUTER UNE REERVATION */ 


router.get('/ajoutReservation', async(req, res)=> {
  const locations= await pool.query('SELECT NumLoc,LibeleLoc FROM location')
  const semaines=await pool.query('SELECT * FROM semaine')
  const clients=await pool.query('SELECT * FROM client')
  res.render('admin/ajoutReservation', {locations,semaines,clients})
})

router.post('/ajoutReservation',isAdmin, async (req, res)=> {
  const { NumLoc,NumSemaine,NumClient,NbPersResa,ResaValid,ResaAttente } = req.body;
  console.log(NumLoc)
  console.log(NumSemaine)
  await pool.query('INSERT INTO reservation  (NumLoc, NumClient,NbPersResa, ResaValid, ResaAttente, ResaRefus) VALUES (?, ?, ?, ?, ?, ?)', [NumLoc, NumClient,NbPersResa, ResaValid, ResaAttente,0])
 
  const NbResa = await pool.query('SELECT count(NumResa) AS IdResa FROM reservation')

  await pool.query('INSERT INTO effectue (NumResa,NumLoc,NumSemaine) VALUES (?,?,?)',[ NbResa[0].IdResa ,NumLoc,NumSemaine]);
  req.flash('success','Ajout de la reservation réussi');
  res.redirect('/listeReservation');

})





module.exports = router