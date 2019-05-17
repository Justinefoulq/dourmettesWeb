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
    },
    isGoodClientAjoutAvis(req,res,next){
      const { NumLoc, NumClient }= req.params;
      if(req.user.NumClient==NumClient){
        return next();
      }
      return res.redirect('/Error');
    },

    async hasReservationValid (req,res,next){
    	const {NumLoc,NumClient} =req.params;
    	const hasReserved = await pool.query('SELECT R.NumResa FROM reservation R, location L, client C WHERE L.NumLoc=? AND C.NumClient=? AND R.NumClient=C.NumClient AND R.NumLoc=L.NumLoc AND R.ResaValid=1 AND R.CommentaireResa=0' ,[NumLoc,NumClient])
   
    	if(hasReserved[0] != undefined) {
    		return next();
    	}
    	req.flash('message','Vous ne pouvez pas ajouter un avis si vous n\'avez pas de reservation valide pour cette location OU que vous avez déja donné votre avis sur cette location');
    	return res.redirect('/location/' +NumLoc);
    }

}



