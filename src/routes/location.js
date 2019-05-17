const express = require('express')
const router = express.Router()

const passport =require('passport')
const {isLoggedIn,isNotLoggedIn,isGoodClientAjoutAvis,hasReservationValid} = require('../lib/auth');
const pool = require('../database');




/*ROUTE LOCATION*/


router.get('/location/:NumLoc', async (req,res) => {
	const {NumLoc} = req.params
	const location = await pool.query('SELECT * FROM location WHERE NumLoc=?',[NumLoc]);
	const photos = await pool.query('SELECT CheminPhoto FROM photo WHERE NumLoc=?',[NumLoc]);
	const semdispo = await pool.query('SELECT * FROM semaine S WHERE S.NumSemaine NOT IN (SELECT E.NumSemaine FROM effectue E, reservation R WHERE R.NumResa=E.NumResa AND R.ResaRefus!=1 AND E.NumLoc=?)',[NumLoc]);
	const saison =await pool.query('SELECT S.NumSaison , S.LibSaison , S.SemDebutSaison, S.SemFinSaison ,T.PrixSemaine, T.SuplementNbPersSup4 FROM saison S, tarif T,applique A WHERE A.NumSaison=S.NumSaison AND T.NumTarif=A.NumTarif AND A.NumLoc=? ORDER BY S.SemDebutSaison',[NumLoc]);
   	const avis = await pool.query ('SELECT A.TitreAvis, A.NoteAvis,A.CommentaireAvis, A.DateAvis, C.NomClient, C.PrenomClient FROM avis A, client C WHERE A.NumLoc=? AND C.NumClient=A.NumClient',[NumLoc])
   	
    res.render('location' ,{ location : location[0], photos,semdispo,saison,avis});
});


/*GESTION AVIS */

router.get('/ajoutAvis/:NumLoc/:NumClient',isGoodClientAjoutAvis,hasReservationValid, async(req, res)=> {
	const {NumLoc,NumClient}=req.params
  res.render('ajoutAvis',{NumLoc,NumClient})
})

router.post('/ajoutAvis/:NumLoc/:NumClient', isGoodClientAjoutAvis, hasReservationValid, async (req, res)=> {
	const {NumLoc,NumClient}=req.params

  const { TitreAvis, NoteAvis, CommentaireAvis } = req.body;

  const newAvis = { TitreAvis, NoteAvis, CommentaireAvis };

  await pool.query('INSERT INTO avis (TitreAvis,NoteAvis,CommentaireAvis,NumLoc,NumClient) VALUES(?,?,?,?,?)', [TitreAvis,NoteAvis,CommentaireAvis,NumLoc,NumClient])
  await pool.query('UPDATE reservation SET CommentaireResa=1 WHERE NumClient=? AND NumLoc=?' , [NumClient, NumLoc])
  
  req.flash('success','Ajout de votre avis réussi');
  res.redirect('/location/'+NumLoc)
});










module.exports = router;