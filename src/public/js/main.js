
function checkPassword(form) { 
    password1 = form.MdpClient.value; 
    password2 = form.MdpClient2.value; 
   if (password1 != password2) { 
        alert ("\n Vos mots de passe ne sont pas identiques !") 
        return false; 
    } 
} 