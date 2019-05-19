const express = require('express')
const router = express.Router()
const {isAdmin} = require('../lib/auth');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const pool = require('../database')

/*LISTE VISITE */

router.get('/listeVisites',isAdmin, async (req,res) => {
  const visites = await pool.query('SELECT * FROM visite');
  res.render('admin/listeVisites' ,{ visites } );
});

 /*AJOUT VISITE */ 
router.get('/ajoutVisite',isAdmin, async (req,res) => {
  
  res.render('admin/ajoutVisite'  );
});

router.post('/ajoutVisite',isAdmin, async (req, res)=> {
  const {TitreVisite , DescriptionVisite,UrlSiteVisite,UrlPhotoVisite} = req.body;
  const newVisite =  {TitreVisite , DescriptionVisite,UrlSiteVisite,UrlPhotoVisite};
  
  await pool.query('INSERT INTO visite SET ?', [newVisite])
  req.flash('success',' Ajout de la visite réussi');
  res.redirect('/admin/listeVisites')
})

 /* MODIFICIATIONDE VISITES*/ 
router.get('/modifVisite/:NumVisite', isAdmin, async(req,res) => {
  const {NumVisite}=req.params;
  const visites = await pool.query('SELECT * FROM visite WHERE NumVisite = ?', [NumVisite]);
  res.render('admin/modifVisite',{visites : visites[0]});

})
/*Modification de visite via form*/
router.post('/modifvisite/:NumVisite',isAdmin, async(req,res)=>{
  const {NumVisite}=req.params;
  const {TitreVisite , DescriptionVisite,UrlSiteVisite,UrlPhotoVisite} = req.body;
  const newVisite = { TitreVisite , DescriptionVisite,UrlSiteVisite,UrlPhotoVisite};
  
 
 await pool.query('UPDATE visite  set ? WHERE NumVisite = ?', [newVisite,NumVisite]);
 req.flash('success','Visite n°'+ NumVisite+' modifiée');
 res.redirect('/admin/listeVisites');

})
 /*SUPRESSION VISITE */ 

router.delete('/supprVisite/:NumVisite', isAdmin, async (req,res)=>{
  const {NumVisite} = req.params;
  await pool.query ('DELETE FROM visite WHERE NumVisite=?',[NumVisite]);
  req.flash('message','Visite n°' +NumVisite+ ' supprimée');
  res.redirect('/admin/listeVisites');

})



module.exports = router