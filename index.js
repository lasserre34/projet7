
if(document.cookie.length == 0){
    document.location.href="index.html"
}
// apel de la fonction get qui recupere les post de la base de données
console.log(document.cookie.length)
var cookie = document.cookie.split('token=')
getALLpost()
 
// récupération de luserId du l'utilisateur qui a poster le gif pour pouvoir afficher son profil
var $_GET = [];
var parts = window.location.search.substr(1).split("&");
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    console.log(temp)
}
temp.pop()
console.log(temp);
var postId = temp[0]
if (temp[0] == null){
    console.log('cest null')
}
else{
    getProfilUserPost()
}

function deroulant(){
    document.getElementById('deroulantBlock').style.display="block"
}
function returnProfil() {
    /*function apeler lors du click sur le lien "Retourner au menu principal"  */
    document.getElementById('deroulantBlock').style.display="none" ;
    //fait disparaitre le lien "Retourner au menu principal"
    document.getElementById('returnProfil').style.display = "none"
    // fait aparaitre le lien "profil"
    document.getElementById('profilDeroulant').style.display = "block"
    // vide la div contenant "le profil"
    document.getElementById('profilage').innerHTML = "";
}
// tableaux pour récuperer les element du profil ; 
let tbltProfil = []

function getProfilUserPost(){


    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette GET qui recupere les données de la table profil via le pseudo de l'utilisateur*/
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log(response)
           
            var profilUser = response.data;

            document.getElementById('profilage').innerHTML = "";
            profilUser.forEach(element => {


                if (element.first_Name == null) {
                    element.first_Name = "Ajouter un prenom"
                }
                if (element.last_Name == null) {
                    element.last_Name = "Ajouter un nom"
                }
                if (element.description == null) {
                    element.description = "Ajouter une description"
                }
                const profilage = document.createElement('div')

                profilage.innerHTML = ` <div id="profilGetUser">
                <a href="#" onclick="exitProfil()">exit<i class="fas fa-times"></i></a>
                <div id="divImageProfil">

                <img class="imageProfil" alt="image de profil" src=${element.imageProfil}></div>
                <p>Pseudo: ${element.pseudo}</p><br>
                <p>Prenom: ${element.first_Name}</p><br>
                <p>Nom: ${element.last_Name}</p><br>
                <button id="btnSuprimerCompte" type="button" onclick="deleteUserAdmin()">Supprimer le compte</button> 
                 </div>

               
             `



                // fait apparaitre la div profilage 
                document.getElementById('profilage').style.display = "block"
                // afiche la const profilage in html
                document.getElementById('profilage').appendChild(profilage)
            
               console.log(localStorage.getItem('admin') == 1)
               if(localStorage.getItem('admin') == 1){
                   document.getElementById('btnSuprimerCompte').style.display= "block" 
               }
            })

        }
    };
    
    
    request.open("GET", "https://localhost:3000/api/profil/getprofiluser/" + postId);
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);
    request.send();
}




function buttonProfil() {
    /*function appeler lors du click sur le lien profil */
document.getElementById('deroulantBlock').style.display="none" ; 


 
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette GET qui recupere les données de la table profil via le pseudo de l'utilisateur*/
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log(response)
            // fait disparaitre la div qui permet d'envoyer un post si elle est toujour active
            document.getElementById('divPost').style.display = "none";

            // fait disparaitre le lien "Profil"
            document.getElementById('profilDeroulant').style.display = "none";
            // fait aparaitre le lien "Retourner au menu principal"
            document.getElementById('returnProfil').style.display = "block";

            var profilUser = response.data;

            document.getElementById('profilage').innerHTML = "";
            profilUser.forEach(element => {


                if (element.first_Name == null) {
                    element.first_Name = "Ajouter un prenom"
                }
                if (element.last_Name == null) {
                    element.last_Name = "Ajouter un nom"
                }
                if (element.description == null) {
                    element.description = "Ajouter une description"
                }
                const profilage = document.createElement('div')

                profilage.innerHTML = ` <div id="profilGet">
                <a href="#" onclick="exitProfil()">exit<i class="fas fa-times"></i></a>
                <div id="divImageProfil">

                <img class="imageProfil" alt="image de profil" src=${element.imageProfil}></div>
                <p>Pseudo: ${element.pseudo}</p><br>
                <p>Prenom: ${element.first_Name}</p><br>
                <p>Nom: ${element.last_Name}</p><br>
                <button type="button" onclick="displayUpdateProfil()">Modifier votre profil</button> 
                 </div>

                <div id="updateProfil">
                <a href="#" onclick="exitProfil()"><i class="fas fa-times"></i></a>
                <form id="updateP"  method="POST"  enctype="multipart/form-data">
                <label name="image">Modifier votre image de Profil</label>
               <input name="image" alt="image de profil" id="imageUpdate" type="file" placeholder="${element.imageProfil}"><br>
               <label name="lastName">Nom:</label> <input id="nomUpdate" name="lastName" type="texte" placeholder="${element.last_Name}"><br>
               <label name="prenom">Prenom:</label><input id="updatePrenom" name="prenom" type="texte" placeholder="${element.first_Name}"><br>
                <label  for="pseudoUpdate" name="pseudo">Pseudo></label><input id="pseudoUpdate" name="pseudo" type="texte" placeholder="${element.pseudo}"><br>
               <button type="button" onclick="modifyProfil()">Valider les modification</button>
               </form>
               </div>
             `



                // fait apparaitre la div profilage 
                document.getElementById('profilage').style.display = "block"
                // afiche la const profilage in html
                document.getElementById('profilage').appendChild(profilage)
                // ne fait pas aparaitre la div uptdateProfil 
                document.getElementById('updateProfil').style.display = "none";
               // 
               document.getElementById('profilGet').style.width="auto" ; 
               
                // element du profil push dans le tableaux pour recuperer pour la fonction updateProfil 

                var first_Name = element.first_Name
                var last_Name = element.last_Name
                var pseudo = element.pseudo
                var description = element.description
                var imageProfil = element.imageProfil
                var id = element.id /* permet l'identification du profil  !important!*/
                var userId = element.userId
                // vide le tableaux 

                tbltProfil = [];
                tbltProfil.push(first_Name, last_Name, pseudo, description, imageProfil, id, userId)

                console.log(tbltProfil)
            })

        }
    };
    
    
    const userIdProfil = localStorage.getItem('userId')
  
    request.open("GET", "https://localhost:3000/api/profil/getprofil/" + userIdProfil);
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);
    request.send();
}

function exitProfil(){
    document.location.href="forum.html"
}
function displayUpdateProfil() {
    /* function apeler lors du click sur le bouton Modifier votre Profil*/
    // fait apparaitre la div updateProfil
    document.getElementById("updateProfil").style.display = "block";
    // vide la div profil 
    document.getElementById("profilGet").style.display = "none" ;
   //
   document.getElementById('updateProfil').style.width= "auto" ;
}

function modifyProfil() {
    /* function apeler lors du click sur le bouton valider les modification  */


    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette PUT qui va envoyer a la BDD les modification apporter au profil */

        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            var response = JSON.parse(request.responseText);
            console.log(response)
            tbltPseudo = []
            tbltPseudo.push(response)
            document.getElementById('getPost').innerHTML = "";
            localStorage.setItem('pseudo' , response)
            buttonProfil()
            getALLpost()


        }
    };
    const userIdProfil = localStorage.getItem('userId')

    request.open("PUT", "https://localhost:3000/api/updateprofil/" + userIdProfil);
    
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);

    // Récuperation des valeurs du formulaire 



    this.updatePrenom = document.getElementById('updatePrenom').value;


    this.nomUpdate = document.getElementById('nomUpdate').value;

    

    this.imageUpdate = document.getElementById('imageUpdate').files[0];


    this.pseudoUpdate = document.getElementById("pseudoUpdate").value;


    if (this.updatePrenom == "") {
        this.updatePrenom = tbltProfil[0]
    }
    if (this.nomUpdate == "") {
        this.nomUpdate = tbltProfil[1]
    }
    if (this.pseudoUpdate == "") {
        this.pseudoUpdate = tbltProfil[2]
    }
   




    console.log(tbltProfil[4])
    this.profil = {
        pseudo: this.pseudoUpdate,
        firstName: this.updatePrenom,
        lastName: this.nomUpdate,
        imageProfil: tbltProfil[4],
        userId: userIdProfil

    }


    this.profilString = JSON.stringify(this.profil)
    formData = new FormData()

    // formData.append('image' , this.imageUpdate , this.imageUpdate)
    formData.append('profil', this.profilString)

    if (this.imageUpdate == undefined) {
        console.log("image non modifer")
    } else {
        formData.append('image', this.imageUpdate, this.imageUpdate.name)
    }
    /*formData = new FormData(); pour les fichier ????? */


    request.send(formData);
}


function displayFormPost() {
    /* function apeler lors du click sur le lien post */

    // fait aparaitre la divpost 
    document.getElementById('divPost').style.display = "block";
    document.getElementById('profilGet').style.display = "none";
    document.getElementById('updateProfil').style.display = "none";
    document.getElementById('profilDeroulant').style.display = "block";
    document.getElementById('returnProfil').style.display = "none";
}
let tbltUserIdObjectPost = [];

function post() {
    /* function apeler lors du click sur le bouton "partager" */


    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /*  requette post qui envoie dans la base de donnéer un fichier multimedia est le pseudo */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            var response = JSON.parse(request.responseText);
           
            console.log(response.data)
            tbltUserIdObjectPost = [];

            tbltUserIdObjectPost.push(response.data)
            // fait disparaitre la divpost
            document.getElementById('divPost').style.display = "none";
            // vide la div getPost 
            document.getElementById('getPost').innerHTML = "";
            getALLpost()


        }
    };

    request.open("POST", "https://localhost:3000/api/post");
  
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);

    this.userIdPostAuth = {
        userId: this.userIdPost
    }

    this.userIdPost = localStorage.getItem('userId')

    this.pseudoPost = localStorage.getItem('pseudo')


    fd = new FormData()
    this.file = document.getElementById('filePost').files[0]
    console.log(this.file.name)
    fd.append('image', this.file, this.file.name)
    fd.append('pseudo', this.pseudoPost)
    fd.append('userId', this.userIdPost)


    console.log(fd)


    request.send(fd)
}

// tableaux pour recuperer l'id du post 
let tbltPostId = [];

let tbltPost = [];

function getALLpost() {
    /* function apeler lorsque la page se recharge est lors de la réussite de la requette post post */

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette GET qui affiche tout les post in html */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
          
            reversePost = response.post
            recupPost = reversePost.reverse()
            reverseCom = response.com
            recupCom = reverseCom.reverse()



            console.log(recupPost)
            console.log(recupCom)
            recupPost.forEach((element, index) => {
                const postGet = document.createElement('div')
                postGet.innerHTML = `<div id="postGet">
                <form action="forum.html">
                <input type="hidden" name="${element.userId}" value="${element.userId}">
                     <button type="submit" class="pseudoPost"> Pseudo: ${element.pseudo}</button>
                     </form>
                     <img alt="gif poster par ${element.pseudo}" id="imagePost" src="${element.file}"> 
                     <form action="post.html">
                      <input type="hidden" name="${element.id}" value="${element.id}">
                       <button id="lienCommentaire" type="submit">${recupCom[index].nb_commentaire} commentaire: </button>
                    </form>
                    `

                document.getElementById("getPost").appendChild(postGet)


                var tbltPostId = [];
                var tbltPost = [];
                var post = {
                    pseudo: element.pseudo,
                    file: element.file,
                    id: element.id
                }
                tbltPost.push(post);
                tbltPostId.push(element.id);

            })


        }
    };

    request.open("GET", "https://localhost:3000/api/post/forum");
   
    request.send();

}

function exitPostFile(){
    document.location.href="forum.html"
}

// recupération de l'id dans l'url pour pouvoir faire une requette get rien qu'avec l'id du post selectionner

function deleteUser() {
    /* function apeler lors du click surl le lien "supprimer mon compte"*/

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette post envoyant le pseudo de l'utilisateur peremtant de lui crée un profil par default */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(request.responseText);
           // tbltPseudo.splice(0, 1)
           deconnexion()
           
        }
    };

  
    request.open("DELETE", "https://localhost:3000/api/auth/deleteuser");
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);

     var Iduser = localStorage.getItem('userId')
     var userIdDelete = JSON.parse(Iduser)
    
    var objectDelete = {

        userId: userIdDelete
    }
    var deleteUser = JSON.stringify(objectDelete)
    //formData = new FormData()
    //formData.append('userDelete', this.deleteUser )
    request.send(deleteUser);

}

function deleteUserAdmin() {
    /* function apeler lors du click surl le lien "supprimer mon compte"*/

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette post envoyant le pseudo de l'utilisateur peremtant de lui crée un profil par default */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(request.responseText);
           
           document.location.href="forum.html"
           
        }
    };

    
    request.open("DELETE", "https://localhost:3000/api/auth/deleteuser/" + postId);
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);

    
    
    var objectDelete = {

        userId: postId
    }
    var deleteUser = JSON.stringify(objectDelete)
    //formData = new FormData()
    //formData.append('userDelete', this.deleteUser )
    request.send(deleteUser);

}

function deconnexion() {
 
   
    document.cookie=`token=;  expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ ; secure=true`;

    document.location.href ="index.html"
}