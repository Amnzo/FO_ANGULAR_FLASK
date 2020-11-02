import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'cf-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.scss']
})
export class MesReservationsComponent implements OnInit {

user:any
resa_en_cours: [];
resa_en_avenir: [];
resa_en_passes: [];

  constructor(private confirmationDialogService: ConfirmationDialogService,private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('connected_user'));
     
    this.reservations();
  }

  public openConfirmationDialog(id_resa,index,id_onglet) {

    console.log(id_onglet)
    this.confirmationDialogService.confirm('Voulez-vous réellement supprimer cette réservation ?', '')
    .then((confirmed) =>
    {
      if(confirmed)
      {
        if(id_onglet==1)
        {
          this.resa_en_cours.splice(index, 1);
         
        }
        if(id_onglet==2)
        {

          this.resa_en_avenir.splice(index, 1);
        }
        if(id_onglet==3)
        {
          this.resa_en_passes.splice(index, 1);
        }
        
      }
    } 
    )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  

  reservations(): void {
    this.authenticationService.getallresa(this.user.id_utilisateur)
      .subscribe(
        data => {
         // this.resa = data['reservations'];
          this.resa_en_cours =data[1]
          this.resa_en_avenir=data[0]
          console.log("Reservation Avenir sont :")
          console.log(this.resa_en_avenir)
          this.resa_en_passes=data[2]
          //console.log(data.body);
        },
        error => {
          console.log(error);
        });
  }

}
