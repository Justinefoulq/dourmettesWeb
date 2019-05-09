const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
  res.redirect('/dourmettes/listeclient');
})


module.exports = router
