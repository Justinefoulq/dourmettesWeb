const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');

const pool = require('../database')

/* AJOUT TARIF */ 
router.get('/ajoutTarif', (req, res)=> {
  res.render('admin/ajoutTarif')
})


router.post('/ajoutTarif',isAdmin, async (req, res)=> {
  const {PrixSemaine,SuplementNbPersSup4 } = req.body;
  const newTarif = {PrixSemaine,SuplementNbPersSup4 };
  
  await pool.query('INSERT INTO tarif SET ?', [newTarif])
  req.flash('success',' Ajout de Tarif réussi');
  res.redirect('/admin/listeTarifs')
})

/*Info pour le form de modification semaint */ 
router.get('/modifTarif/:NumTarif', isAdmin ,async(req,res) => {
  const {NumTarif}=req.params;
  const tarifs = await pool.query('SELECT * FROM tarif WHERE NumTarif = ?', [NumTarif]);
  
  res.render('admin/modifTarif',{tarifs : tarifs[0]});

})


/*Modification de Tarif via form*/
router.post('/modifTarif/:NumTarif', isAdmin , async(req,res)=>{
  const {NumTarif}=req.params;
  const {PrixSemaine,SuplementNbPersSup4} = req.body;
  const newTarif = { PrixSemaine,SuplementNbPersSup4};
  
 
 await pool.query('UPDATE tarif  set ? WHERE NumTarif = ?', [newTarif,NumTarif]);
 req.flash('success','Tarif n°'+ NumTarif+' modifiée');
 res.redirect('/admin/listeTarifs');

})


/*SUPPRESSION TARIF */

router.get('/supprTarif/:NumTarif',isAdmin,async (req,res)=>{
  const {NumTarif} = req.params;
  await pool.query ('DELETE FROM tarif WHERE NumTarif=?',[NumTarif]);
  req.flash('message','Tarif n°' +NumTarif+ ' supprimé');
  res.redirect('/admin/listeTarifs');

})


module.exports = router