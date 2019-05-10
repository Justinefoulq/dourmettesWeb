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
		successRedirect:'/inscription',
		failureRedirect: '/connexion',
		failureFlash: true
	}) (req,res,next);
}),

router.get('/mesInfos' , (req,res) =>{
	res.render('mesInfos');
})

router.get('/deconnexion' , (req,res) =>{
	req.logOut();
	res.redirect('/connexion');
});






module.exports = router
