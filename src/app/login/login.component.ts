import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { SignInData } from '../model/signInData';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../my-modal/my-modal.component';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isFormValid = false;
  areCredentialsInvalid = false;
  title = 'angular-material-modals';

  code_entreprise: string;
  name: string;
  

  constructor(private jwtHelper: JwtHelperService,private authenticationService: AuthenticationService,private modalService: NgbModal,public dialog: MatDialog) { }

  ngOnInit() {

   // if (this.jwtHelper.isTokenExpired("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDM4NDUwMjgsIm5iZiI6MTYwMzg0NTAyOCwianRpIjoiNmVkMjg3OTktN2Q3ZS00YWJmLWFiMWUtZmFlYjQwMTc4YzM0IiwiZXhwIjoxNjAzODQ1OTI4LCJpZGVudGl0eSI6InBoaWxpcHBlLmRhcm1vbkBhcnZhbC5mciIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.CkTXNxgTUAHGQd4UQcgzBbbG3xG5ZCqz_RFyKfLIB-8")) {
    //  console.log("expired")
    //} else {
      //console.log("not  expired")
    //}
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '250px',
      data: { code_entreprise: this.code_entreprise }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.code_entreprise = result;
      if(result)
      {
        this.authenticationService.codeentreprise(result)
        this.code_entreprise="amnzo"+result
        
      }
     
    
    });
  }
 

  onSubmit(form: NgForm) {

  this.areCredentialsInvalid=!this.authenticationService.isAuthenticated
    this.authenticationService.authenticate(form.value.login,form.value.password)

    return;
  
   

  }

 
}
