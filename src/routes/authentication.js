const express = require('express')
const router = express.Router()
const pool = require('../database');
const passport =require('passport')
const helpers = require('../lib/helpers');
const {isLoggedIn,isNotLoggedIn} = require('../lib/auth');


/* INSCRIPTION CLIENT */ 

router.get('/inscription',isNotLoggedIn,(req,res)=>{
	res.render('auth/inscription');
});

router.post('/inscription',isNotLoggedIn, passport.authenticate('local.signup', {
		successRedirect:'/',
		failureRedirect: '/inscription',
		failureFlash : true
}));


/* CONNECTION CLIENT */ 

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


/* DECONNECTION CLIENT */ 


router.get('/deconnexion' ,isLoggedIn, (req,res) =>{
	req.logOut();
	res.redirect('/connexion');
});





module.exports = router
