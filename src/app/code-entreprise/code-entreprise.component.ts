import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cf-code-entreprise',
  templateUrl: './code-entreprise.component.html',
  styleUrls: ['./code-entreprise.component.scss']
})
export class CodeEntrepriseComponent implements OnInit {
   client = JSON.parse(localStorage.getItem('codeE'));

  constructor() { }


  ngOnInit() {
    localStorage.getItem('testObject');
    console.log(this.client)
  }

 

}