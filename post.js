
// recupération du cookie 
if(document.length == 0){
  document.location.href="index.html"
}
var cookie = document.cookie.split('token=')
 console.log(cookie[1])

//document.getElementById('returnProfil').style.display = "block";

var $_GET = [];
var parts = window.location.search.substr(1).split("&");
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    console.log(temp)
}
temp.pop()
console.log(temp);
var postId = temp[0]
// si commentairID EST UNDEFINED ALORS LA requette  ne S'envoit pas 
getOnePost()
var recupPost
var postIdCom

function getOnePost() {  
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        /* requette GET qui affiche tout les commentaire via leur id  in html */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
           
            recupPost = response
            recupPost.forEach(function(response, index) {
            
                 
            
                const postGetId = document.createElement('div')
               
                postGetId.innerHTML = `   <a href="#" onclick="exitPost()"><i class="fas fa-times"></i></a>
                <a id="displayDeletePost" href="#" onclick="deletePost('${index}')"> <i class="fas fa-trash-alt"></i></a>
                <p class="pseudoPost">Pseudo:${response.pseudo}</p>
        <img id="filePost" src="${response.file}"> 
        `       
        
       
                postIdCom = response.postId
                document.getElementById('getPostId').appendChild(postGetId)

                if(response.userId == localStorage.getItem("userId")){
                    document.getElementById('displayDeletePost').style.display= "block" ; 
                }
            })
            commentairePost()
        }
    }
    request.open("GET", "https://localhost:3000/api/get/forum/" + postId);
    request.setRequestHeader('Content-Type', 'application/json');
   
   
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);

    request.send();
}
function exitPost(){
    document.location.href="forum.html"
}
var recupCommentairePost

function commentairePost() {
    recupCommentairePost = []
    console.log(recupCommentairePost)
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        /* requette GET qui affiche tout les commentaire via leur id  in html */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);

            document.getElementById('getCommentaire').innerHTML = " ";
                reverseCom = response.data
            recupCommentairePost = reverseCom.reverse()
            console.log(recupCommentairePost)

            if (recupCommentairePost.length == 0) {
                document.getElementById('getCommentaire').innerHTML = "il n'y a pas de commentaire "
            } else {

                recupCommentairePost.forEach(function(element, index) {

                    // console.log(recupCommentairePost.length)
                    const recupCommentaire = document.createElement('div')
                    recupCommentaire.setAttribute("id" , "comId")
                    recupCommentaire.innerHTML = `
                  <a href="#" id="displayDeleteComment${index}" onclick="deleteCommentaire(${index})"> <i class="far fa-trash-alt"></i></a>
                 <a href="#" id="displayModifyComment${index}" onclick="displayModify(${index})"> <i class="fas fa-pencil-alt"></i></a>
               <p>Pseudo:${element.pseudo}</p>
              <p class="comentWrap">${element.commentaire}</p>
              <section id="commentBlock${index}">
           <textarea  id="commentModifyId${index}" type="texte" placeholder="${element.commentaire}"></textarea>
           <button id="btnModifyComments${index}" onclick="modifyComments(${index})">modifier le commentaire</button>
           </section>
     `

                    document.getElementById('getCommentaire').appendChild(recupCommentaire);
                    if(element.userId == localStorage.getItem('userId')){
                     document.getElementById('displayDeleteComment' + index).style.display= "block"
                     document.getElementById('displayModifyComment' + index).style.display="block"

                    }else{
                        document.getElementById('displayDeleteComment' + index).style.display= "none" ; 
                        document.getElementById('displayModifyComment' + index).style.display="none" ;
                    }
                    
                    
                     document.getElementById('commentBlock' + index).style.display= "none" ;
                })
            }
            const inputCommentaire = `
            
           
     <label name="com">Commentaire:</label><br>
    <textarea type="texte" name="com" id="com"></textarea><br>
    </form>
   <button type="button" onclick="valideCommentaire()">Envoyer votre commentaire</button>
 `
            document.getElementById('inputCom').innerHTML = inputCommentaire

        };
    }



    request.open("GET", "https://localhost:3000/api/post/commentaire/" + postId);
    request.setRequestHeader('Content-Type', 'application/json');
    const tokens = sessionStorage.getItem('token')

    var token = JSON.parse(tokens)
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);

    request.send();

}
function displayModify(index){
    document.getElementById('commentBlock' + index).style.display= "block" ; 
    console.log("okoko")
}
function valideCommentaire() {
    /* function appler lors du click sur  le button "valider commentaire"*/

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        /* requette post envoyant les donnée relative au commentaire  */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            var response = JSON.parse(request.responseText);
            // enleve le formulaire pour poster un commentaire 

            // vide le tableau Id si la requette c'est bien passer
            tbltPostId = [];

            commentairePost()
        }
    };
    const tokens = sessionStorage.getItem('token')
    var token = JSON.parse(tokens)
    request.open("POST", "https://localhost:3000/api/post/commentaire");
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);




    var pseudoStorage = localStorage.getItem('pseudo')
    var userIdStorage = JSON.parse(localStorage.getItem('userId'))

    this.objectCommentaire = {
        postId: postId,
        pseudo: pseudoStorage,
        userId: userIdStorage,
        commentaire: document.getElementById('com').value

    }
    this.commentaire = JSON.stringify(this.objectCommentaire)
    //formData = new FormData()
    //formData.append("commentaire",this.commentaire )
    console.log(this.objectCommentaire)
    request.send(this.commentaire);

}

function modifyComments(index) {
    var commentsPostId = recupCommentairePost[index].id
    this.recupUserIdComments = recupCommentairePost[index].userId
    console.log(document.getElementById('commentModifyId' + index).value)
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette PUT qui va envoyer a la BDD les modification apporter au commentaire */

        console.log(this.commentsPostId)
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            var response = JSON.parse(request.responseText);
            console.log(response)
            commentairePost()
        }
    }
    const tokens = sessionStorage.getItem('token')

    var token = JSON.parse(tokens)
    request.open("PUT", "https://localhost:3000/api/post/commentaire/update/" + commentsPostId);
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);
      
    var commentsModify = {
        commentaire: document.getElementById('commentModifyId' + index).value,
        userId: this.recupUserIdComments

    }

    var comment = JSON.stringify(commentsModify)
    request.send(comment);
}


console.log(recupCommentairePost)
function deleteCommentaire(index) {
    console.log(index)
    console.log(recupCommentairePost)
    var idCommentaire = recupCommentairePost[index].id
    this.recupUserIdCommentaire = recupCommentairePost[index].userId

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette DELETE qui supprime le  commentaire selectionner */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            var response = JSON.parse(this.responseText);
            console.log(postId)
            document.getElementById('getPostId').innerHTML = " ";
            document.getElementById('getCommentaire').innerHTML = " ";
            getOnePost()

        }
    }
    const tokens = sessionStorage.getItem('token')
    var token = JSON.parse(tokens)
    request.open("DELETE", "https://localhost:3000/api/post/commentaire/delete/" + idCommentaire);
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);

    this.postIdCommentaire = postId

    this.deleteCommentaires = {
        userId: this.recupUserIdCommentaire,
        postId: this.postIdCommentaire
    }

    this.userIdCommentaire = JSON.stringify(this.deleteCommentaires)

    // fd = new FormData()
    console.log(this.userIdCommentaire)
    // fd.append('userId' , this.userIdCommentaire)

    request.send(this.userIdCommentaire);


}

function deletePost(index) {
    var idPost = recupPost[index].id
    this.recupUserIdPost = recupPost[index].userId

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        /* requette DELETE qui supprime le  POST selectionner */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            var response = JSON.parse(this.responseText);
            console.log(postId)
            document.getElementById('getPostId').innerHTML = " ";

            document.getElementById('getCommentaire').innerHTML = " ";
            document.location.href = "forum.html"

        }
    }
    const tokens = sessionStorage.getItem('token')
    var token = JSON.parse(tokens)
    request.open("DELETE", "https://localhost:3000/api/post/delete/" + idPost);
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Authorization', ` Bearer ${cookie[1]}`);



    //fd = new FormData()



    this.postDelete = {
        userId: this.recupUserIdPost,

    }

    this.userIdPostDelete = JSON.stringify(this.postDelete)
    // console.log(this.userIdPost)
    // fd.append('userId' , this.userIdPostDelete)

    request.send(this.userIdPostDelete);


}