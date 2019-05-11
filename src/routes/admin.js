const express = require('express')
const router = express.Router()

const pool = require('../database')

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

router.get('/listeclient', async (req,res) => {
  const clients = await pool.query('SELECT * FROM client');
  res.render('admin/listeclient' ,{ clients } );
});

router.get('/listeReservation', async (req,res) => {
  const reservation = await pool.query('SELECT * FROM reservation');
  res.render('admin/listeReservation' ,{ reservation } );
});

router.get('/suppr/:NumClient',async (req,res)=>{
  const {NumClient} = req.params;
  await pool.query ('DELETE FROM client WHERE NumClient=?',[NumClient]);
  req.flash('success','Client supprimé');
  res.redirect('/admin/listeclient');

})




router.get('/modifClient/:NumClient',async(req,res) => {
  const {NumClient}=req.params;
  const clients = await pool.query('SELECT * FROM client WHERE NumClient = ?', [NumClient]);
  console.log(client[0])
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

/*GESTION RESERVATION */ 

/*router.get('/refus/:NumResa',async (req,res)=>{
  const {NumResa} = req.params;
  const etatResaInitial= await pool.query('SELECT ')

  await pool.query ('DELETE FROM Reser WHERE NumClient=?',[NumClient]);
  req.flash('success','Reservation Refusé');
  res.redirect('/admin/listeclient');

})*/







module.exports = router
