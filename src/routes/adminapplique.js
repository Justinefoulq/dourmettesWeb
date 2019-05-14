const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');

const pool = require('../database')


/* GESTION DES APPLIQUE - TARFIFS SUR UNE SAISON SUR UNE LOCATION */ 

router.get('/appliqueTarifs',isAdmin,async(req,res) => {
  const locations = await pool.query('SELECT * FROM location')
  const saisons = await pool.query('SELECT * FROM saison')
  const tarifs = await pool.query('SELECT * FROM tarif')
  res.render('admin/appliqueTarifs',{locations,saisons,tarifs})
})

router.post('/ajoutAppliquer',isAdmin, async (req, res)=> {
  const {NumLoc,NumSaison,NumTarif } = req.body;
  const newApplique = {NumLoc,NumSaison,NumTarif  };
  
  await pool.query('INSERT INTO applique SET ?', [newApplique])
  req.flash('success',' Tarifs n°'+NumTarif+ 'appliqué sur la location n°'+NumLoc+ 'pour la saison n°' +NumSaison);
  res.redirect('/admin/listeApplique')
})

/*LISTE RELATION APPLIQUE */

router.get('/listeApplique',isAdmin,async(req,res) => {
  const applique = await pool.query('SELECT L.LibeleLoc, S.LibSaison,T.PrixSemaine, T.SuplementNbPersSup4 FROM location L, saison S, tarif T, applique A WHERE A.NumLoc=L.NumLoc AND A.NumSaison=S.NumSaison AND T.NumTarif=A.NumTarif')
  
  res.render('admin/listeApplique',{applique})
})



module.exports = router