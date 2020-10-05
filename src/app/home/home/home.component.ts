import { Appointment } from './../../shared/model/appointment.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {
doctors :any = [];
doctorSubscription : Subscription;
isLoad : boolean = false;
docName: string = '';
appointment : Appointment = new Appointment();
showMsg: boolean = false;
showErrMsg : boolean = false;
slots =  ['15min', '30min', '45min', '60min'];
  constructor(private _doctServ: DoctorService, private _aptmntServ: AppointmentService) { }

  ngOnInit(): void {
    //generating data from api 
    this.isLoad = true
   this.doctorSubscription = this._doctServ.getDocotors().pipe(shareReplay()).subscribe((res)=>{
 
    this.doctors = res;
    this.isLoad = false;
   
    })
  }
  ngOnDestroy(){
    //unsubscribing api
  this.doctorSubscription.unsubscribe();
  }
  book(doc){
    this.docName = doc.doctor_name;
    this.appointment.doctor_id = doc._id;
  }
  bookAppointment(form :NgForm){
    const data={
      appointment_date : this.appointment.aptDate,
      appointment_time :this.appointment.aptTime,
      doctor_id : this.appointment.doctor_id,
      patient_name : this.appointment.ptName,
      patient_email : this.appointment.ptEmail,
      patient_phone :this.appointment.ptPhone
    }
    this._aptmntServ.postAppointment(data).subscribe((res)=>{
     this.appointment.doctor_id = '';
     this.showMsg = true;
      form.resetForm();
    },(err)=>{
      this.showErrMsg = true;
    })
  }

}
