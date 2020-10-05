import {
  filter,
  map,
  shareReplay,
  toArray
} from 'rxjs/operators';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppointmentService
} from 'src/app/services/appointment.service';
import {
  DoctorService
} from 'src/app/services/doctor.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  name: string;
  isLoad: boolean = false;
  userid: string;
  appointMents: any = [];
  getDates: any = [];
  constructor(private _docServ: DoctorService, private _reportServ: AppointmentService) {}

  ngOnInit(): void {
    this.isLoad = true;
    this.name = this._docServ.getAuthData().name;
    this.userid = this._docServ.getAuthData().userid;
    this._reportServ.getApoointMent(this.userid).pipe(shareReplay()).subscribe((res) => {
      this.appointMents = res;
      this.isLoad = false;
      this.getDates = this.appointMents.map((data) => {
        return data.appointment_date
      })
      this.getDates.sort((a, b) => {
        return a - b
      });
    })

  }
  checkDate(date) {
    this.isLoad = true;
    if (date.value == 'all') {
      this._reportServ.getApoointMent(this.userid).pipe(shareReplay()).subscribe((res) => {
        this.appointMents = res;
        this.isLoad = false;
      })
    } else {
      this._reportServ.getApoointMent(this.userid).pipe(shareReplay()).subscribe((res) => {
        this.appointMents = res;
        this.appointMents = this.appointMents.filter(data => data.appointment_date == date.value);
        this.isLoad = false;

      })
    }

  }
  ViewBystatus(status) {
    this.isLoad = true;
    this._reportServ.getApoointMent(this.userid).pipe(shareReplay()).subscribe((res) => {
      this.appointMents = res;
      this.appointMents = this.appointMents.filter(data => data.appointment_status == status.value);
      this.isLoad = false;
    })
  }
  changeStatus(query, status) {
    const data = {
      appointment_status: status.value
    }
    this._reportServ.changeAppointmentStatus(query._id, data).subscribe((res) => {
      console.log(res);
      this.ngOnInit()
    })
  }
}
