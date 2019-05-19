const express = require('express')
const router = express.Router()

const passport =require('passport')
const {isLoggedIn,isNotLoggedIn,isGoodClientResa} = require('../lib/auth');
const pool = require('../database');
const mailer = require("nodemailer");

var smtpTransport = mailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user: "domainedesdourmettes@gmail.com",
		pass: "AdminDourmettes"
	}
});

var mail = {
	from: "domainedesdourmettes@gmail.com",
	to: "justinefoulquier@hotmail.fr",
	subject: "Demande de reservation ",
	html: "Bonjour Nathalie, vous avez reçus une nouvelle demande de reservation, allez consulter cette demande sur : https://dourmettes.herokuapp.com/ dans votre espace administrateur"
}




/*CREATION RESERVATION*/ 

router.post('/creareservation/:NumClient/:NumLoc',isGoodClientResa, isLoggedIn, async (req, res)=> {
	const{NumClient,NumLoc }= req.params;
	const {NumSemaine,NbPersResa} =req.body;
	
	await pool.query('INSERT INTO reservation (NbPersResa, NumClient, NumLoc, ResaValid, ResaAttente, ResaRefus) VALUES (?, ?, ?, ?, ?, ?)',[NbPersResa,NumClient,NumLoc,0,1,0]);
	const NbResa = await pool.query('SELECT count(NumResa) AS IdResa FROM reservation')

	await pool.query('INSERT INTO effectue (NumResa,NumLoc,NumSemaine) VALUES (?,?,?)',[ NbResa[0].IdResa ,NumLoc,NumSemaine]);
	req.flash('success', 'Demande de réservation réussie');
	smtpTransport.sendMail(mail, function(error, response){
		if(error){
			console.log("Erreur lors de l'envoi du mail!");
			console.log(error);
		}else{
			console.log("Mail envoyé avec succès!")
		}
		smtpTransport.close();
	});
	res.redirect('/location/'+NumLoc);

})







module.exports = router