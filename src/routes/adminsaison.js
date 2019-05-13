const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');

const pool = require('../database')


/* ROUTE LISTE SAISONS */ 
router.get('/listeSaisons',isAdmin, async (req,res) => {
  const saison = await pool.query('SELECT * FROM saison');
  res.render('admin/listeSaisons' ,{ saison } );
});

router.get('/ajoutSaison', (req, res)=> {
  res.render('admin/ajoutSaison')
})

router.post('/ajoutSaison',isAdmin, async (req, res)=> {
  const { LibSaison,SemDebutSaison,SemFinSaison } = req.body;
  const newSaison = {
    LibSaison,
    SemDebutSaison,
    SemFinSaison
  };
  console.log(newSaison)
  await pool.query('INSERT INTO saison set ?', [newSaison])
  req.flash('success','Ajout de la saison réussie');
  res.redirect('/admin/listeSaisons')
})

/*Info pour le form de modification saison */ 
router.get('/modifSaison/:NumSaison',isAdmin,async(req,res) => {
  const {NumSaison}=req.params;
  const saisons = await pool.query('SELECT * FROM saison WHERE NumSaison = ?', [NumSaison]);
  
  res.render('admin/modifSaison',{saisons : saisons[0]});

})
/*Modification de saison via form*/
router.post('/modifSaison/:NumSaison',isAdmin, async(req,res)=>{
  const {NumSaison}=req.params;
  console.log(NumSaison)
  const { LibSaison,
    SemDebutSaison,
    SemFinSaison} = req.body;
  console.log(SemDebutSaison)
  const newSaison = {  LibSaison,
    SemDebutSaison,
    SemFinSaison};
  
 
 await pool.query('UPDATE saison  set ? WHERE NumSaison = ?', [newSaison,NumSaison]);
 req.flash('success','Saison n°'+ NumSaison+' modifiée');
 res.redirect('/admin/listeSaisons');

})


/*SUPPRESSION Saison */

router.get('/supprSaison/:NumSaison', isAdmin, async (req,res)=>{
  const {NumSaison} = req.params;
  await pool.query ('DELETE FROM saison WHERE NumSaison=?',[NumSaison]);
  req.flash('message','Saison n°' +NumSaison+ ' supprimée');
  res.redirect('/admin/listeSaisons');

})



/*ENVOI INFO AU FORM AJOUTSAISON*/ 

module.exports = router