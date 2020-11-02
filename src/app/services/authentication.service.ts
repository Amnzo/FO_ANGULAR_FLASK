import { Injectable, ɵConsole } from '@angular/core';
import { SignInData } from '../model/signInData';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { map } from 'rxjs/operators';
const baseUrl = 'http://localhost:5000/';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly mockUser: SignInData = new SignInData('user', 'test');
  isAuthenticated = false;
  codeE=false;
  user:any
  array: [];
  

  constructor(private router: Router, private http: HttpClient) { }

  authenticate(login,pwd){

     this.http.post(`${baseUrl}/login`,{login,pwd})
     .subscribe(googleVolumeListResponse => {
       if(googleVolumeListResponse){
         console.log(googleVolumeListResponse)
        this.isAuthenticated=true
        sessionStorage.setItem('connected_user', JSON.stringify(googleVolumeListResponse));
       this.router.navigate(['/home']);
       return true
       
       }
       else
       {
         
        return false;
       }
     
  });
  
  }

codeentreprise(code:String)
{
  var api_token=JSON.parse(sessionStorage.getItem('connected_user')).api_token
  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + api_token
});
  
  this.http.get(`${baseUrl}/entreprise?code=${code}`)
  .subscribe(googleVolumeListResponse => {
    if(googleVolumeListResponse){
    console.log(googleVolumeListResponse);
    this.codeE=true
    sessionStorage.setItem('codeE', JSON.stringify(googleVolumeListResponse));
    this.router.navigate(['/adhesion']);
    }
   return true
});
}

get_resa_by_id(id_reservation:Number): Observable<any> {
  var api_token=JSON.parse(sessionStorage.getItem('connected_user')).api_token
  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + api_token
});
  console.log(api_token)
  return this.http.get(`${baseUrl}/resabyid?id_reservation=${id_reservation}`, { headers: reqHeader })
}


getallresa(user:Number): Observable<any> {
  //var auth_token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDM4NDY1NjksIm5iZiI6MTYwMzg0NjU2OSwianRpIjoiMWU3YjkzZmUtZDdmNy00OGY4LThlZDgtZTdkNDA4ZjliMDZhIiwiZXhwIjoxNjAzODQ3NDY5LCJpZGVudGl0eSI6InBoaWxpcHBlLmRhcm1vbkBhcnZhbC5mciIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.Ggez26-9po65gmDjUWDBTz-XzN5k36n1JA1JNpDPeDo'
  //var reqHeader = new HttpHeaders({ 
   // 'Content-Type': 'application/json',
  //  'Authorization': 'Bearer ' + auth_token
// });
  
  //return this.http.get(`${baseUrl}/resa?user=1006`, { headers: reqHeader });
  //console.log("getresa token")
  var api_token=JSON.parse(sessionStorage.getItem('connected_user')).api_token
  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + api_token
});
  console.log(api_token)
  return this.http.get(`${baseUrl}/resa?user=${user}`, { headers: reqHeader })
}







getusers(): Observable<any> {
  var api_token=JSON.parse(sessionStorage.getItem('connected_user')).api_token
  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + api_token
});
  return this.http.get(`${baseUrl}/users`, { headers: reqHeader });
}

getformulepro(user:Number): Observable<any> {
  var api_token=JSON.parse(sessionStorage.getItem('connected_user')).api_token
  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + api_token
});
  return this.http.get(`${baseUrl}/formulepro?user=${user}`, { headers: reqHeader });
}

getparkings(formule:Number): Observable<any> {
  var api_token=JSON.parse(sessionStorage.getItem('connected_user')).api_token
  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + api_token
});
  return this.http.get(`${baseUrl}/parkings?formule=${formule}`, { headers: reqHeader });
}
  
  logout() {
    this.isAuthenticated=false
    sessionStorage.removeItem('connected_user');
    this.router.navigate(['']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
