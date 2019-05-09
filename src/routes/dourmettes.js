const express = require('express')
const router = express.Router()

const pool = require('../database')

router.get('/inscription', (req, res)=> {
  res.render('dourmettes/inscription')
})

router.post('/inscription', async (req, res)=> {
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
  res.send('received')
})

router.get('/listeclient', async (req,res) => {
  const client = await pool.query('SELECT * FROM client');
  res.render('dourmettes/listeclient' ,{ client } );
});

router.get('/suppr/:NumClient',async (req,res)=>{
  const {NumClient} = req.params;
  await pool.query ('DELETE FROM client WHERE NumClient=?',[NumClient]);
  res.redirect('/dourmettes/listeclient');

})

router.get('/modifClient/:NumClient',async(req,res) => {
  const {NumClient}=req.params;
  const client = await pool.query('SELECT * FROM client WHERE NumClient = ?', [NumClient]);
  console.log(client[0])
  res.render('dourmettes/modifClient',{client : client[0]});

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
 console.log(newClient);
 await pool.query('UPDATE client set ? WHERE NumClient = ?', [newClient,NumClient]);
 res.redirect('/dourmettes/listeclient');

})

module.exports = router
