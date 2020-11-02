import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { CodeEntrepriseComponent } from './code-entreprise/code-entreprise.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyModalComponent } from './my-modal/my-modal.component';



import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReservationsComponent } from './reservations/reservations.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StatisticComponent,
    CodeEntrepriseComponent,
    MyModalComponent,
    ReservationsComponent,
    MesReservationsComponent,
    ConfirmationDialogComponent,
    EditReservationComponent,
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    NgbModule,
    MatInputModule,
    MatButtonModule

  ],
  entryComponents: [MyModalComponent,ConfirmationDialogComponent],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
