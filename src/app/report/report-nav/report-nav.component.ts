import {
  Component,
  OnInit
} from '@angular/core';
import {
  DoctorService
} from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  styleUrls: ['./report-nav.component.css']
})
export class ReportNavComponent implements OnInit {
  name: string;
  authData;any;
  constructor(private _docServ: DoctorService) {}

  ngOnInit(): void {
    this.authData = this._docServ.getAuthData();
    console.log(this.authData)
    this.name = this.authData.name;
  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._docServ.logout();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    })
  }

}
