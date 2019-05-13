const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');

const pool = require('../database')

router.get('/ajoutTarif', (req, res)=> {
  res.render('admin/ajoutTarif')
})


router.post('/ajoutTarif',isAdmin, async (req, res)=> {
  const {PrixTarif,SuplementNbPersSup4 } = req.body;
  const newTarif = {PrixTarif,SuplementNbPersSup4 };
  
  await pool.query('INSERT INTO tarif SET ?', [newTarif])
  req.flash('success','	Ajout de Tarif réussie');
  res.redirect('/admin/listeTarifs')
})

/*Info pour le form de modification semaint */ 
router.get('/modifTarif/:NumTarif',isAdmin,async(req,res) => {
  const {NumTarif}=req.params;
  const tarifs = await pool.query('SELECT * FROM tarif WHERE NumTarif = ?', [NumTarif]);
  
  res.render('admin/modifTarif',{tarifs : tarifs[0]});

})
/*Modification de Tarif via form*/
router.post('/modifTarif/:NumTarif',isAdmin, async(req,res)=>{
  const {NumTarif}=req.params;
  console.log(NumTarif)
  const {PrixTarif,SuplementNbPersSup4} = req.body;
  console.log(SuplementNbPersSup4)
  const newTarif = { PrixTarif,SuplementNbPersSup4};
  
 
 await pool.query('UPDATE tarif  set ? WHERE NumTarif = ?',isAdmin, [newTarif,NumTarif]);
 req.flash('success','Tarif n°'+ NumTarif+' modifiée');
 res.redirect('/admin/listeTarifs');

})

/*SUPPRESSION TARIF */

router.get('/supprTarif/:NumTarif',async (req,res)=>{
  const {NumTarif} = req.params;
  await pool.query ('DELETE FROM tarif WHERE NumTarif=?',isAdmin,[NumTarif]);
  req.flash('message','Tarif n°' +NumTarif+ ' supprimée');
  res.redirect('/admin/listeTarifs');

})




module.exports = router