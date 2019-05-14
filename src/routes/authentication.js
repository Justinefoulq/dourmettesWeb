const express = require('express')
const router = express.Router()

const passport =require('passport')
const {isLoggedIn,isNotLoggedIn} = require('../lib/auth');
const pool = require('../database');


router.get('/inscription',isNotLoggedIn,(req,res)=>{
	res.render('auth/inscription');
});

router.post('/inscription',isNotLoggedIn, passport.authenticate('local.signup', {
		successRedirect:'/connexion',
		failureRedirect: '/inscription',
		failureFlash : true
}));



router.get('/connexion', isNotLoggedIn ,(req,res)=> {
	res.render('auth/connexion')
});

router.post('/connexion', isNotLoggedIn, (req,res,next) => {

	passport.authenticate ('local.signin', {
		successRedirect:'/inscription',
		failureRedirect: '/connexion',
		failureFlash: true
	}) (req,res,next);
}),




router.get('/deconnexion' ,isLoggedIn, (req,res) =>{
	req.logOut();
	res.redirect('/connexion');
});


router.get('/mesInfos' , isLoggedIn, (req,res) =>{
	res.render('mesInfos');
})



module.exports = router
