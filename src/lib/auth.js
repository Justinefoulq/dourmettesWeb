const express = require('express')
const router = express.Router()
const pool = require('../database');

module.exports = {
	/*est connecte */ 
	isLoggedIn(req,res,next) {
		if(req.isAuthenticated()) {
			return next();
		}
		return res.redirect('/connexion');
	},

	/* n'est pas connecte */ 

	 isNotLoggedIn(req, res, next){
	    if(!req.isAuthenticated()){
	      return next();
	    }
	    return res.redirect('/');
	  },

	  isAdmin(req,res,next){
	  	if(req.isAdmin()) {
	  		return next();
	  	}
	  	return res.redirect('/');
	  	
	  }

}

/*isAdmin(async(req,res) =>{
	const{NumClient}=req.params;
	const admin = isnull (await pool.query('SELECT * FROM `client` WHERE Admin IS NOT NULL'));
})*/

