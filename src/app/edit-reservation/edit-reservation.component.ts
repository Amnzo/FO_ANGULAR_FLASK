import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {NgbTimeStruct,NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cf-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {
  one_reservation:any
  date_depart_prevue
  date_retour_prevue
  id_reservation
  login
  nom_modele
  nom_parking
  nom_vehicule
  isEditable=true
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  seconds = false;

_YMD_depart
_YMD_retour

  


  constructor(private route:ActivatedRoute,private authenticationService:AuthenticationService)
   {
    this.reservation_by_id()
    }

  ngOnInit() {
   
   
  }


  reservation_by_id(): void {
    this.authenticationService.get_resa_by_id(this.route.snapshot.params['reservation'])
      .subscribe(
        data => {
          console.log("---------------data-----------------------------")
          this.id_reservation=data.id_reservation
          this.login=data.login
          this.date_depart_prevue=data.date_depart_prevue
          this.date_retour_prevue=data.date_retour_prevue
          this.nom_modele=data.nom_modele
          this.nom_parking=data.nom_parking
          this.nom_vehicule=data.nom_vehicule
          console.log(data.year_d+"  "+data.month_d+"  "+data.day_d)

        
          this._YMD_depart =  new NgbDate(data.year_d,data.month_d,data.day_d);
          this._YMD_retour =  new NgbDate(data.year_f,data.month_f,data.day_f);




        


         // this.resa = data['reservations'];
          this.one_reservation =JSON.stringify(data)
          console.log("--------------------------------------------")
         console.log(this.one_reservation)
         console.log("--------------------------------------------")

        },
        error => {
          console.log(error);
        });
  }


}
