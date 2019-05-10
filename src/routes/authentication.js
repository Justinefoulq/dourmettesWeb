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
	res.render('auth/connexion')
});

router.post('/connexion', (req,res,next) => {

	passport.authenticate ('local.signin', {
		successRedirect:'/connexion',
		failureRedirect: '/connexion',
		failureFlash: true
	}) (req,res,next);
}),





module.exports = router
