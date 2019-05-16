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
	  	if(req.user.Admin==1) {
	  		return next();
	  	}
	  	return res.redirect('/Error');	
	  },
	  isGoodClient(req,res,next){
	  	const {NumClient} = req.params;
	  
	  	if(NumClient==req.user.NumClient) {
	  		return next();
	  	}
	  	return res.redirect('/Error');	
	  },

	  isGoodClientResa(req,res,next){
	  	const {NumClient,NumLoc} = req.params;
	  	if(NumClient==req.user.NumClient) {
	  		return next();
	  	}
	  	return res.redirect('/Error');	
	  },

	  isGoodClientAnnulerResa(req,res,next){
      const { NumResa, NumClient }= req.params;
      if(req.user.NumClient==NumClient){
        return next();
      }
      return res.redirect('/Error');
    }

}



