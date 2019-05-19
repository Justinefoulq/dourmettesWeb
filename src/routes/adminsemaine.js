const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

const pool = require('../database')

/* ROUTE LISTE SEMAINES */ 
router.get('/listeSemaines',isAdmin, async (req,res) => {
  const semaine = await pool.query('SELECT * FROM semaine');
  res.render('admin/listeSemaines' ,{ semaine } );
});

router.get('/ajoutSemaine', (req, res)=> {
  res.render('admin/ajoutSemaine')
})


router.post('/ajoutSemaine',isAdmin, async (req, res)=> {
  const {NumSemaine,DateDebutSemaine,DateFinSemaine } = req.body;
  const newSem = { NumSemaine,DateDebutSemaine,DateFinSemaine};
  
  await pool.query('INSERT INTO semaine SET ?', [newSem])
  req.flash('success','	Ajout de semaine réussi');
  res.redirect('/admin/listeSemaines')
})

/*Info pour le form de modification semaint */ 
router.get('/modifSemaine/:NumSemaine', isAdmin, async(req,res) => {
  const {NumSemaine}=req.params;
  const semaines = await pool.query('SELECT * FROM semaine WHERE NumSemaine = ?', [NumSemaine]);
  
  res.render('admin/modifSemaine',{semaines : semaines[0]});

})
/*Modification de semaine via form*/
router.post('/modifSemaine/:NumSemaine',isAdmin, async(req,res)=>{
  const {NumSemaine}=req.params;
  const {DateDebutSemaine,DateFinSemaine} = req.body;
  const newSemaine = { DateDebutSemaine,DateFinSemaine};
  
 
 await pool.query('UPDATE semaine  set ? WHERE NumSemaine = ?', [newSemaine,NumSemaine]);
 req.flash('success','Semaine n°'+ NumSemaine+' modifiée');
 res.redirect('/admin/listeSemaines');

})

/*SUPPRESSION SEMAINE */

router.delete('/supprSemaine/:NumSemaine', isAdmin, async (req,res)=>{
  const {NumSemaine} = req.params;
  await pool.query ('DELETE FROM semaine WHERE NumSemaine=?',[NumSemaine]);
  req.flash('message','Semaine n°' +NumSemaine+ ' supprimée');
  res.redirect('/admin/listeSemaines');

})












module.exports = router