import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'cf-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
user:any
allusers: any;
formule_pro: any;
parkings: any;
model;
time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  seconds = false;

  
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('connected_user'));
    console.log(this.user)
    this.users()
  }


  users(): void {
    this.authenticationService.getusers()
      .subscribe(
        data => {
          this.allusers = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  formulepro(user): void {
    console.log("formule pro"+user)
    this.authenticationService.getformulepro(user)
        .subscribe(
          data => {
            this.formule_pro = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
  
  }
  
  
  
  getparks(formule): void {
    this.authenticationService.getparkings(formule)
        .subscribe(
          data => {
            this.parkings = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
  
  }

}
