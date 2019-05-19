const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));


const pool = require('../database')


/* ROUTE LISTE SAISONS */ 
router.get('/listeSaisons',isAdmin, async (req,res) => {
  const saison = await pool.query('SELECT * FROM saison');
  res.render('admin/listeSaisons' ,{ saison } );
});

router.get('/ajoutSaison', async(req, res)=> {
   const semaines=await pool.query('SELECT * FROM semaine')
  res.render('admin/ajoutSaison',{semaines})
})

router.post('/ajoutSaison',isAdmin, async (req, res)=> {
  const { LibSaison,SemDebutSaison,SemFinSaison } = req.body;
  const newSaison = {
    LibSaison,
    SemDebutSaison,
    SemFinSaison
  };

  await pool.query('INSERT INTO saison set ?', [newSaison])
  req.flash('success','Ajout de la saison réussi');
  res.redirect('/admin/listeSaisons')
});

/*Info pour le form de modification saison */ 
router.get('/modifSaison/:NumSaison',isAdmin,async(req,res) => {
  const {NumSaison}=req.params;
  const saisons = await pool.query('SELECT * FROM saison WHERE NumSaison = ?', [NumSaison]);
   const semaines=await pool.query('SELECT * FROM semaine')
  
  res.render('admin/modifSaison',{saisons : saisons[0],semaines});

});

/*Modification de saison via form*/
router.post('/modifSaison/:NumSaison',isAdmin, async(req,res)=>{
  const {NumSaison}=req.params;
  const { LibSaison,
    SemDebutSaison,
    SemFinSaison} = req.body;
  const newSaison = {  LibSaison,
    SemDebutSaison,
    SemFinSaison};
  
 
 await pool.query('UPDATE saison  set ? WHERE NumSaison = ?', [newSaison,NumSaison]);
 req.flash('success','Saison n°'+ NumSaison+' modifiée');
 res.redirect('/admin/listeSaisons');

})


/*SUPPRESSION Saison */

router.delete('/supprSaison/:NumSaison', isAdmin, async (req,res)=>{
  const {NumSaison} = req.params;
  await pool.query ('DELETE FROM applique WHERE NumSaison=?',[NumSaison]);
  await pool.query ('DELETE FROM saison WHERE NumSaison=?',[NumSaison]);
  req.flash('message','Saison n°' +NumSaison+ ' supprimée');
  res.redirect('/admin/listeSaisons');

})





module.exports = router