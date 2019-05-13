const express = require('express')
const router = express.Router()

const pool = require('../database')

/* ROUTE LISTE SEMAINES */ 
router.get('/listeSemaines', async (req,res) => {
  const semaine = await pool.query('SELECT * FROM semaine');
  res.render('admin/listeSemaines' ,{ semaine } );
});

router.get('/ajoutSemaine', (req, res)=> {
  res.render('admin/ajoutSemaine')
})


router.post('/ajoutSemaine', async (req, res)=> {
  const {NumSemaine,DateDebutSemaine,DateFinSemaine } = req.body;
  const newSem = { NumSemaine,DateDebutSemaine,DateFinSemaine};
  
  await pool.query('INSERT INTO semaine SET ?', [newSem])
  req.flash('success','	Ajout de semaine réussie');
  res.redirect('/admin/listeSemaines')
})

/*Info pour le form de modification semaint */ 
router.get('/modifSemaine/:NumSemaine',async(req,res) => {
  const {NumSemaine}=req.params;
  const semaines = await pool.query('SELECT * FROM semaine WHERE NumSemaine = ?', [NumSemaine]);
  
  res.render('admin/modifSemaine',{semaines : semaines[0]});

})
/*Modification de semaine via form*/
router.post('/modifSemaine/:NumSemaine', async(req,res)=>{
  const {NumSemaine}=req.params;
  console.log(NumSemaine)
  const {DateDebutSemaine,DateFinSemaine} = req.body;
  console.log(DateDebutSemaine)
  const newSemaine = { DateDebutSemaine,DateFinSemaine};
  
 
 await pool.query('UPDATE semaine  set ? WHERE NumSemaine = ?', [newSemaine,NumSemaine]);
 req.flash('success','Semaine n°'+ NumSemaine+' modifiée');
 res.redirect('/admin/listeSemaines');

})

/*SUPPRESSION SEMAINE */

router.get('/supprSemaine/:NumSemaine',async (req,res)=>{
  const {NumSemaine} = req.params;
  await pool.query ('DELETE FROM semaine WHERE NumSemaine=?',[NumSemaine]);
  req.flash('message','Semaine n°' +NumSemaine+ ' supprimée');
  res.redirect('/admin/listeSemaines');

})












module.exports = router