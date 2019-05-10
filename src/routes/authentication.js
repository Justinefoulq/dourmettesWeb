const express = require('express')
const router = express.Router()

const passport =require('passport')

router.get('/inscription',(req,res)=>{
	res.render('auth/inscription');


});

router.post('/inscription',	passport.authenticate('local.signup', {
		successRedirect:'/connexion',
		failureRedirect: '/inscription',
		failureFlash : true
}));

router.get('/connexion',(req,res)=> {
	res.send('Ceci est la connexion')
});





module.exports = router
