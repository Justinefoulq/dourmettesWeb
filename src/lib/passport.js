const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use('local.signup',new localStrategy({

	usernameField: 'MailClient',
	passwordField: 'MdpClient',
	passReqToCallback : true 
}, async (req,MailClient,MdpClient,done) =>{
	console.log(req.body);


}) );

/*passport.serializeUser((usr,done) => {

})*/
