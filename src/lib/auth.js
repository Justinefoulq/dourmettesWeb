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
	  }


}