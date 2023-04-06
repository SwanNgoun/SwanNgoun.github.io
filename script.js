//initialiser une variable pour le chemin pour le server de mes objets à donner (MockAPI)
let path = "https://6419affbc152063412c9157c.mockapi.io/objetsCommun/";

/**
 * function pour afficher les objets du server MockAPI
 * ne reçoit aucune paramètre
 * retour rien
 */
function afficher() {
    /*$.getJSON() va chercher les données au server en le convertisant en JSON
    si on utilise .$ajax il faut ajouter pour qu'il comprend que c'est des données JSON:  contentType : 'application/json', type : 'GET'
    .done() est exécuté quand on a reçu la réponse du serveur, au fait il attend d'obtenir les données avant procéder au code suivant
     */
    $.getJSON(path).done(function (objetCommun) {
        for (o of objetCommun) {
            $("#contenuServer").append(
                `<div id='imagebg' class="fw-bold border border-dark border-2 rounded-5 col-md-3 col-sm-10 m-1">
                <div id='div'${o.id} >
                     <p id='identite${o.id}' class="text-center">ID: ${o.id}</p>
                     <p id='objet${o.id}' class="fs-5 text-success-emphasis"> ${o.objet}</p>
                     <p id='description${o.id}'>${o.description}</p>
                     <p id='quantite${o.id}'>Quantité: ${o.quantite}</p>  
                 </div> </div>`
            )
        }
    });
}

//Appeler la fonction afficher() pour afficher les objets du server MockAPI
afficher();

//Ajouter un objet à donner dans liste (MockAPI) à de l'évènement click du bouton submit
//bouton submit, cela reload la page et la mise à jour de l'affichage, Puisse-je laisser comme ca ou prevénir load et manuelle mise à jour de l'affichage???
$("#ajouterAuServer").click(function () {
    //stocker les data du formulaire
    let name = $("#name").val();
    let email = $("#email").val();
    let objet = $("#objet").val();
    let description = $("#description").val();
    let quantite = $("#quantite").val();

    if (name !== "" && email !== "" && objet !== "" && quantite !== "") {
        //POST: envoyer des données au server JSON
        $.ajax(path, {
            data: JSON.stringify({
                "name": name,
                "email": email,
                "objet": objet,
                "description": description,
                "quantite": quantite
            }),
            contentType: 'application/json',
            type: 'POST'
        }).catch(error => {
            console.log(error.message);
        });
    }
    else{
        //code si une des cases sont vides dans form1
    }
});

//l'évènement change dans la case id du form2, il serve à afficher la quantité restante du l'objet à donner
$("#id").change(function (){
    let id = $("#id").val();
    let qtite = 0;

    //avec id récupé, on va afficher la quantite stockée dans le server MockAPI
    $.getJSON(path+id).done(function (profilID){
        qtite = profilID.quantite;
        $("#qtiteObjet").val(qtite);
    }).catch(error => {
        console.log(error.message);
    });
});

//l'évènement click du bouton ajouter du form2: il va ajouter les objets désirés dans le panier
$("#ajouterPanier").click(function (){
    //récupérer la quantité mise par l'utilisateur
    let qtite = $("#qtiteObjet").val();
    let qtiteReel, name, email, objet;

    //avec id récupé, on va afficher la quantite stockée dans le server MockAPI
    $.getJSON(path+id).done(function (profilID){
        name = profilID.name;
        email = profilID.email
        objet = profilID.objet;
        qtiteReel = profilID.quantite;
    }).catch(error => {
        console.log(error.message);
    });

    if(qtite > qtiteReel && qtite <= 3){
        //enlever la visibilité mis sur la notification d'erreur
        document.getElementById("erreurQtite2").classList.remove("invisible");
        //modifier le message d'erreur pour qu'elle soit appropriée
        $("#erreurQtite2").Text("La quantité d'objets = " + qtiteReel);
    }
    else if(qtite > 3){
        //enlever la visibilité mis sur la notification d'erreur
        document.getElementById("erreurQtite2").classList.remove("invisible");
        //modifier le message d'erreur pour qu'elle soit appropriée
        $("#erreurQtite2").Text("La quantité d'objets maximum permise = 3");
    }
    else{
        //remettre la visibilité sur la nofication d'erreur
        document.getElementById("erreurQtite2").classList.add("invisible");
    }
    //création de l'objet panier et objets
    //mettre le panier dans localstorage
    //mise à jour avec l'affichage
});

$("#commander").click(function (){
    //reprendre le localstorage et restocker localsotage
    //mise à jour avec le server mockapi
});


/*
  //vérifier l'erreur du nbre de fruits total acheté qui ne doit pas dépasser 24 sinon notifation sur le nbre total de fruits
    else if( nbreFruits > 24){
        //enlever la visibilité mis sur la notification d'erreur
        document.getElementById("erreur").classList.remove("invisible");
        //modifier le message d'erreur pour qu'elle soit appropriée à l'erreur du nbre de fruit total acheté
        document.getElementById("erreur").innerText = "Le nombre total de fruit ne doit pas dépasser 24.";
        return false;
    }
    //autrement, pas d'erreur de total prix et nbre total de fruits acheté
    else{
        //remettre la visibilité sur la nofication d'erreur
        document.getElementById("erreur").classList.add("invisible");

        //Stocker les données dans une sessionStorage
        sessionStorage.setItem("panier", panierAcheter);

        return true;
    }
 */