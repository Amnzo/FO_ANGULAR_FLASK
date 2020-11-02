import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { StatisticComponent } from './statistic/statistic.component';
import { CodeEntrepriseComponent } from './code-entreprise/code-entreprise.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'mes', component: MesReservationsComponent, canActivate: [AuthGuard] },
  { path: 'statistic', component: StatisticComponent, canActivate: [AuthGuard] },
  { path: 'adhesion', component: CodeEntrepriseComponent },
  { path: 'adhesion', component: CodeEntrepriseComponent },
  { path: 'reservation/:reservation', component: EditReservationComponent, canActivate: [AuthGuard]},

  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
