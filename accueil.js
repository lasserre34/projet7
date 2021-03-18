



if(document.cookie.length == 0){

}
else{
    document.location.href="forum.html"
}

function displaySignup() {
    /* function apeler lors du click sur le lien "inscription" */

    // fait disparaitre "le formulaire de connexion"
    document.getElementById('login').style.display = "none";

    // fait apparaitre "le formulaire d'inscription"
  document.getElementById('signup').style.display = "block";
  document.getElementById('body').style.background = "#263857" ; 
  document.getElementById('link-signup').style.display = "none" ; 
  document.getElementById('htmlBack').style.background = "none" ;
  document.getElementById('link-login').style.display = "none" ;
  document.getElementById('signupLogin').style.display="none" ;
  document.getElementById('image-responsive').style.display="none" ; 

}
 
 function exitSignup(){
    document.location.href="index.html"
    
 }

function displayLogin() {
    /* function appeler lors du click sur le lien "connexion" */

    // fait displaraitre "le formulaire d'inscription"
    document.getElementById('signup').style.display = "none";

    //fait apparaitre "le formulaire de connexion"
    document.getElementById('login').style.display = "block"
    document.getElementById('body').style.background = "#263857" ; 
    document.getElementById('link-signup').style.display = "none" ; 
    document.getElementById('htmlBack').style.background = "none" ;
    document.getElementById('link-login').style.display = "none" ;
    document.getElementById('signupLogin').style.display="none" ;
    document.getElementById('image-responsive').style.display="none";
}

/* tableau pour récuperer "le pseudo" lors de l'inscription qui sera utiliser lors de la création automatique 
du profil par default */


var tbltUserId = [];
var tbltPseudo = [];

function inscription() {
    /*function apeler lors du click sur le bouton inscription*/

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette post qui envera les données du formulaire d'inscription a la BDD */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            var response = JSON.parse(request.responseText);


            // push de l'elemtn pseudo qui servira a crée un profil par default    
            tbltPseudo.push(response.pseudo)
            console.log(response.pseudo)
            console.log(response)
            pushPseudoProfile()
            /* si  les données de l'inscritpion on était enregistrer avec succées apel la function pour cré un profil par default */
          document.getElementById('validationSignup').style.display= "block"  ;
            displayLogin()
           

        }
        else{
            var response = request.responseText
            document.getElementById('erorSignup').innerHTML = response
        }
    }
    
    request.open("POST", "https://localhost:3000/api/auth/signup");
    request.setRequestHeader('Content-Type', 'application/json');

    var signup = {
        /* object avec les propriéter de la requette demander */
        email: document.getElementById('emailSignup').value,
        password: document.getElementById('passwordSignup').value,
        pseudo: document.getElementById('pseudoSignup').value
    }

    request.send(JSON.stringify(signup));

}

function pushPseudoProfile() {
    /* function apeler lors de la réussiste de l'inscription */

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette post envoyant le pseudo de l'utilisateur peremtant de lui crée un profil par default */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            var response = JSON.parse(request.responseText);
            console.log(response)
        }
    }

    request.open("POST", "https://localhost:3000/api/auth/pushid");
    request.setRequestHeader('Content-Type', 'application/json');
    console.log(tbltPseudo[0])
    var postObject = {

        pseudo: tbltPseudo[0]
    }

    console.log(postObject)

    request.send(JSON.stringify(postObject));

}


var tbltPseudoCommentaire = [];
var tbltUserId = [];
console.log(tbltUserId)

function connexion() {
    /* function apeler lors du click sur le bouton "connexion" */

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        /* requette post pour la connexion qui envera les données selectionner afin de verifier si elle existe dans la base de donnée*/
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(request.responseText);


            var user = response.data
            /* creation cookie pour token */ 
            var d = new Date()
            d.setTime(d.getTime() + ( 10000 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie= `token=${response.token}; ${expires}; path=/; secure=true;  `;

            user.forEach(element => {
                /* va parcourir le tableau retourner en reponse , va recupérer l'élement "pseudo" est l'enregistrer dans un tableau
                               pour servir lors de la requette getprofil */
                localStorage.setItem("pseudo", element.pseudo);
                localStorage.setItem("userId", element.userId);
            
               
                sessionStorage.setItem("token", JSON.stringify(response.token))
                tbltUserId.push(element.userId)
                tbltPseudo.push(element.pseudo)
                tbltPseudoCommentaire.push(element.pseudo)
            })
            console.log(tbltPseudoCommentaire[0])
            console.log(tbltPseudo[0])

            document.location.href = "forum.html"
            //  fait disparaitre la div conetenant "les lien inscription est connexion" 
            document.getElementById('signupLogin').style.display = "none";

            // fait apparaitre le lien "Profil"
            document.getElementById('profilDeroulant').style.display = "block";

            // fait apparaitre le lien "post" qui permet de poster un fichier dans le forum
            document.getElementById('post').style.display = "block";

            // fait apparaitre le menu deroulant "Mon compte" 
            document.getElementById('listProfil').style.display = "block";
        }
        if (this.readyState == XMLHttpRequest.DONE && this.status == 401){
            var response = JSON.parse(request.responseText);
          console.log(response)
        }
    };


    request.open("POST", "https://localhost:3000/api/auth/login");
    request.setRequestHeader('Content-Type', 'application/json');

    var login = {
        email: document.getElementById('emailLogin').value,
        password: document.getElementById('passwordLogin').value
    }

    request.send(JSON.stringify(login));

}