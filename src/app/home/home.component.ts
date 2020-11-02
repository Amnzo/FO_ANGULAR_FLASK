import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'cf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 consigne= [

    {
      "name": "1. Réservation :"  ,
      "desc": "Pour la bonne marche du service, il est impératif de bien respecter le créneau de réservation.",
      "name2":"6. Etat des lieux :"  ,
      "desc2" :"La déclaration de l'état extérieur en début et en fin de location engage votre responsabilité.",

    },

    {
      "name": "2. Retard  :"  ,
      "desc": "En cas de retard ou d'empêchement, merci de le déclarer au plus vite à la Hotline au 0 800 555 533.",
      "name2": "7. Véhicules non fumeur :"  ,
      "desc2": "Il est interdit de fumer à bord des véhicules Autopartage.",

    },

    {
      "name": "3. Stationnement  :"  ,
      "desc": "Les véhicules Autopartage doivent être garés sur leurs places dédiées",
      "name2": "8. Propreté à bord :"  ,
      "desc2": "Pour le bien être de tous, merci de restituer le véhicule propre.",

    },
    {
      "name": "4. Carburant   :"  ,
      "desc": "Veillez à faire le plein de carburant si le voyant du véhicule l'indique.",
      "name2": "9. Code de la route :"  ,
      "desc2": "Durant toute la durée de votre utilisation, veillez à respecter scrupuleusement le code de la route.",

    },
    {
      "name": "5. Clés et documents de bord  :"  ,
      "desc": "La clé et les documents du véhicule doivent impérativement rester à bord.",
      "name2": "10. Civisme :"  ,
      "desc2": "Par souci de civisme et de savoir-vivre, toujours se comporter de manière responsable à bord d'un véhicule Autopartage.",

    },
  
  
    
  ]
   

  constructor() { }

  ngOnInit() {
    
  }




}
