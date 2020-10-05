import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointMentUrl: string = environment.apiUrl + 'create-appointment/';
  private getAppointmentUrl : string = environment.apiUrl + 'get-appointment/';
  private getChangeStatusUrl : string = environment.apiUrl + 'changeStatus/';
  constructor(private http: HttpClient) {}
  postAppointment(data) {
    return this.http.post(this.appointMentUrl, data);
  }
  getApoointMent(id){
    return this.http.get(this.getAppointmentUrl+id);
  }
  changeAppointmentStatus(id,data){
    return this.http.patch(this.getChangeStatusUrl + id , data);
  }
}
