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

router.get('/', async(req,res) => {
  const links = await pool.query('SELECT * FROM client');
  console.log(links);
  res.send('la liste iras ici bébé');
});

module.exports = router
