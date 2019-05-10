const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');



passport.use('local.signin', new localStrategy ({
	usernameField: 'MailClient',
	passwordField: 'MdpClient',
	passReqToCallback : true 
}, async (req , MailClient , MdpClient , done) => {
	console.log(req.body);
	const rows = await pool.query('SELECT * FROM client WHERE MailClient=?',[MailClient]);
	console.log(rows)
	if (rows.length>0) {
		console.log('je suis dans le if')
		const client = rows[0];
		const validPassword = helpers.matchPassword(MdpClient,client.MdpClient);

		if ( validPassword) {
			done(null,client,req.flash('success', 'Bienvenue ' + client.PrenomClient));
		} else {
			done(null,false,req.flash('message','Mot de passe incorrect'))
		}
	}else {
		return done(null , false , req.flash('message','Il n\'y a pas de compte pour cet Email'));
	}

}));



passport.use('local.signup',new localStrategy({

	usernameField: 'MailClient',
	passwordField: 'MdpClient',
	passReqToCallback : true 
}, async (req , MailClient , MdpClient , done) =>{
	const { NomClient , PrenomClient , NumRueClient , RueClient , CodePostalClient , VilleClient , PaysClient , NumTelClient } = req.body;
  	const newClient = {
	    MailClient,
	    NomClient,
	    PrenomClient,
	    NumRueClient,
	    RueClient ,
	    CodePostalClient ,
	    VilleClient ,
	    PaysClient ,
	    NumTelClient ,
	    MdpClient
	  };

  newClient.MdpClient = await helpers.encryptPassword(MdpClient);

  const result = await pool.query('INSERT INTO client SET ?', [newClient]);
  newClient.NumClient = result .insertId;
  return done(null, newClient);
}) );



passport.serializeUser((client,done) => {
	done(null,client.NumClient)
});

passport.deserializeUser(async (NumClient,done) => {
	const rows = await pool.query('SELECT * FROM client WHERE NumClient=?',[NumClient]);
	done(null,rows[0]);
});


