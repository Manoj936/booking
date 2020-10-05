import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userPass:any;
  userEmail:any;
  constructor(private _docServ: DoctorService) { }

  ngOnInit(): void {

  }
login(){
  const data={
    email: this.userEmail,
    password: this.userPass
  }
  console.log(data)
  this._docServ.login(data)
}
}
