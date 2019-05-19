const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
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
  req.flash('success',' Tarif n°'+NumTarif+ ' appliqué sur la location n°'+NumLoc+ ' pour la saison n°' +NumSaison);
  res.redirect('/admin/listeApplique')
})

/*LISTE RELATION APPLIQUE */

router.get('/listeApplique',isAdmin,async(req,res) => {
  const applique = await pool.query('SELECT L.NumLoc, S.NumSaison, T.NumTarif, L.LibeleLoc, S.LibSaison,T.PrixSemaine, T.SuplementNbPersSup4 FROM location L, saison S, tarif T, applique A WHERE A.NumLoc=L.NumLoc AND A.NumSaison=S.NumSaison AND T.NumTarif=A.NumTarif ORDER BY L.LibeleLoc')
  
  res.render('admin/listeApplique',{applique})
})



/*SUPPRESSION APPLIQUE*/


router.delete('/supprApplique/:NumTarif/:NumLoc/:NumSaison', isAdmin, async (req,res)=>{
  const  {NumTarif,NumLoc,NumSaison}=req.params;
  await pool.query ('DELETE FROM applique WHERE NumTarif= ? AND NumLoc= ? AND NumSaison=?',[NumTarif,NumLoc,NumSaison]);
  req.flash('message','Relation Appliquer supprimée');
  res.redirect('/admin/listeApplique');

})




/*MODIFICATION APPLIQUE - en suspend car pas utile*/

/*router.get('/modifApplique/:NumTarif/:NumLoc/:NumSaison',isAdmin,async(req,res) => {
  const {NumTarif, NumLoc , NumSaison} = req.params;
  const appliques= await pool.query ('SELECT * FROM applique WHERE NumTarif=? AND NumLoc=? AND NumSaison=?', [NumTarif , NumLoc , NumSaison])
  const locations = await pool.query('SELECT * FROM location')
  const saisons = await pool.query('SELECT * FROM saison')
  const tarifs = await pool.query('SELECT * FROM tarif')
  
  res.render('admin/modifApplique',{ appliques : appliques[0],locations,saisons,tarifs});
});
*/
/*Modification de applique via form-------------marche pas ----------*/
/*router.post('/modifApplique/:NumTarif/:NumLoc/:NumSaison',isAdmin, async(req,res)=>{
  const {NumTarif1,NumLoc1,NumSaison1}=req.params;
  const {NumTarif,NumLoc,NumSaison} = req.body;
  const newApplique = {NumTarif,NumLoc,NumSaison}
  console.log(newApplique)
  
 await pool.query ('DELETE FROM applique WHERE NumTarif= ? AND NumLoc= ? AND NumSaison=?',[NumTarif1,NumLoc1,NumSaison1]);
 await pool.query('INSERT INTO applique  set ? ', [newApplique]);
 req.flash('success','Relation Applique modifiée');
 res.redirect('/admin/listeApplique');
})
*/


module.exports = router