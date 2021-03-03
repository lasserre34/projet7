

var $_GET = [];
var parts = window.location.search.substr(1).split("&");
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    console.log(temp)  
}
temp.pop()
console.log(temp);
postId = temp[0]
// si commentairID EST UNDEFINED ALORS LA requette  ne S'envoit pas 
getOnePost()
var recupPost

 function getOnePost(){
 var request = new XMLHttpRequest();

request.onreadystatechange = function() { /* requette GET qui affiche tout les commentaire via leur id  in html */
if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    
  recupPost = response
   recupPost.forEach(function(response, index){
        const postGetId = document.createElement('div')
        postGetId.innerHTML = ` <p class="pseudoPost">Pseudo:${response.pseudo}</p>
        <img src="${response.file}"> 
        <button  id="btnDeletePost" onclick="deletePost('${index}')">Supprimer le post</button>
        
         `

         document.getElementById('getPostId').appendChild(postGetId)
   })
     commentairePost()
      }
 }
request.open("GET", "http://localhost:3000/api/get/forum/" + postId);
request.setRequestHeader('Content-Type', 'application/json');
const  tokens = sessionStorage.getItem('token')
 var token = JSON.parse(tokens)
 request.setRequestHeader('Authorization', ` Bearer ${token}`);

request.send();
 }
 
var recupCommentairePost

 function commentairePost(){
recupCommentairePost = []
console.log(recupCommentairePost)
var request = new XMLHttpRequest();

request.onreadystatechange = function() { /* requette GET qui affiche tout les commentaire via leur id  in html */
if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    
    document.getElementById('getCommentaire').innerHTML= " " ; 
 
  recupCommentairePost = response.data ; 
   console.log(recupCommentairePost) 
  
  if(recupCommentairePost.length == 0 ){
      document.getElementById('getCommentaire').innerHTML = "il n'y a pas de commentaire "
  }
  else{

 recupCommentairePost.forEach(function( element , index ){
  
   // console.log(recupCommentairePost.length)
     const recupCommentaire = document.createElement('div')
     recupCommentaire.innerHTML = `
     <p> ${element.pseudo}</p>
     <p> ${element.commentaire}</p>
     <button id="btnDeleteCommentaire" onclick="deleteCommentaire(${index})">supprimer</button>
   
     `
     
     document.getElementById('getCommentaire').appendChild(recupCommentaire) ; 
     
 })    
}
   const inputCommentaire = `
 <label name="com">Commentaire:</label>
 <input type="texte" name="com" id="com">
 
    <button type="button" onclick="valideCommentaire()">Envoyer votre commentaire</button>
        `
        document.getElementById('inputCom').innerHTML= inputCommentaire 
       
};  
}
request.open("GET", "http://localhost:3000/api/post/forum/" + postId);
request.setRequestHeader('Content-Type', 'application/json');
const  tokens = sessionStorage.getItem('token')

 var token = JSON.parse(tokens)
 request.setRequestHeader('Authorization', ` Bearer ${token}`);

  request.send();

 }

  function valideCommentaire(){ /* function appler lors du click sur  le button "valider commentaire"*/
 
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() { /* requette post envoyant les donnée relative au commentaire  */
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
          var response = JSON.parse(request.responseText);
          // enleve le formulaire pour poster un commentaire 
        
          // vide le tableau Id si la requette c'est bien passer
            tbltPostId = [] ; 

        commentairePost()
      }
  };  
  const  tokens = sessionStorage.getItem('token')
   var token = JSON.parse(tokens)
  request.open("POST", "http://localhost:3000/api/post/postcommentaire/");
  request.setRequestHeader('Authorization', ` Bearer ${token}`);

   
  
   
 var pseudoStorage = sessionStorage.getItem('pseudo')
 var userIdStorage = sessionStorage.getItem('userId')

 this.objectCommentaire ={
     postId: postId , 
     pseudo: pseudoStorage , 
     userId: userIdStorage ,
     commentaire: document.getElementById('com').value 
     
   }
   this.commentaire = JSON.stringify(this.objectCommentaire)
   formData = new FormData()
   formData.append("commentaire",this.commentaire )
  request.send(formData);

}

function deleteCommentaire(index){
 var idCommentaire = recupCommentairePost[index].id
  this.recupUserIdCommentaire = recupCommentairePost[index].userId

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() { /* requette DELETE qui supprime le  commentaire selectionner */
    if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(postId)
        document.getElementById('getPostId').innerHTML= " " ; 
        document.getElementById('getCommentaire').innerHTML= " " ;
       getOnePost()
                     
          }
     }
     const  tokens = sessionStorage.getItem('token')
     var token = JSON.parse(tokens)
    request.open("DELETE", "http://localhost:3000/api/post/commentaire/delete/" + idCommentaire);
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${token}`);
     
    this.deleteCommentaires ={
      userId: this.recupUserIdCommentaire
    }
    
    this.userIdCommentaire = JSON.stringify(this.deleteCommentaires)
    
   // fd = new FormData()
    console.log(this.userIdCommentaire)
   // fd.append('userId' , this.userIdCommentaire)

    request.send(this.userIdCommentaire);


}

function deletePost(index){
  var idPost = recupPost[index].id
  this.recupUserIdPost = recupPost[index].userId

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() { /* requette DELETE qui supprime le  POST selectionner */
    if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(postId)
        document.getElementById('getPostId').innerHTML= " " ; 
                    
          }
     }
     const  tokens = sessionStorage.getItem('token')
     var token = JSON.parse(tokens)
    request.open("DELETE", "http://localhost:3000/api/post/delete/" + idPost);
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${token}`);
     
    
   
    //fd = new FormData()
  
    
   this.postDelete ={
     userId: this.recupUserIdPost
   }

    this.userIdPostDelete = JSON.stringify(this.postDelete)
   // console.log(this.userIdPost)
   // fd.append('userId' , this.userIdPostDelete)

    request.send(this.userIdPostDelete);


}