const express = require('express')
const router = express.Router()

const pool = require('../database')

/*AJOUT CLIENT */

router.get('/ajoutClient', (req, res)=> {
  res.render('admin/ajoutClient')
})

router.post('/ajoutClient', async (req, res)=> {
  const { MailClient , NomClient , PrenomClient , NumRueClient , RueClient , CodePostalClient , VilleClient , PaysClient , NumTelClient , MdpClient } = req.body;
  const newClient = {
    MailClient,
    NomClient,
    PrenomClient,
    NumRueClient,
    RueClient ,
    CodePostalClient ,
    VilleClient ,
    PaysClient ,
    NumTelClient ,
    MdpClient
  };
  console.log(newClient)
  await pool.query('INSERT INTO client set ?', [newClient])
  req.flash('success','ajout Client réussie');
  res.redirect('/admin/listeclient')
})

/* ROUTE LISTE CLIENT + MODIF + SUPPR */ 

router.get('/listeclient', async (req,res) => {
  const clients = await pool.query('SELECT * FROM client');
  res.render('admin/listeclient' ,{ clients } );
});



/*router.get('/supprClient/:NumClient',async (req,res)=>{
  const {NumClient} = req.params;
  await pool.query ('DELETE FROM client WHERE NumClient=?',[NumClient]);
  req.flash('success','Client supprimé');
  res.redirect('/admin/listeclient');

})*/




router.get('/modifClient/:NumClient',async(req,res) => {
  const {NumClient}=req.params;
  const clients = await pool.query('SELECT * FROM client WHERE NumClient = ?', [NumClient]);
  
  res.render('admin/modifClient',{clients : clients[0]});

})

router.post('/modifClient/:NumClient', async(req,res)=>{
  const {NumClient}=req.params;
  const { MailClient , NomClient , PrenomClient , NumRueClient , RueClient , CodePostalClient , VilleClient , PaysClient , NumTelClient , MdpClient } = req.body;
  const newClient = {
    MailClient,
    NomClient,
    PrenomClient,
    NumRueClient,
    RueClient ,
    CodePostalClient ,
    VilleClient ,
    PaysClient ,
    NumTelClient ,
    MdpClient
  };
 
 await pool.query('UPDATE client set ? WHERE NumClient = ?', [newClient,NumClient]);
 req.flash('success','Client modifié');
 res.redirect('/admin/listeclient');

})






/* ROUTE LISTE Tarifs */ 
router.get('/listeTarifs', async (req,res) => {
  const tarif = await pool.query('SELECT * FROM tarif');
  res.render('admin/listeTarifs' ,{ tarif } );
});















module.exports = router
