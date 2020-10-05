import {
  environment
} from './../../environments/environment';
import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Subject
} from 'rxjs';
import {
  of as observableOf
} from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  private getDoctorUrl: string = environment.apiUrl + 'get-all-doctors/'
  private doctorLoginUrl: string = environment.apiUrl + 'doctor-login/'
  private isAuthenticated = false;
  private token: string;
  authInfo: any;
  private authStatusListener = new Subject < boolean > ();
  constructor(private http: HttpClient, private router: Router) {}

  getDocotors() {
    return this.http.get(this.getDoctorUrl); //getting all doctors
  }
  login(data) {
    console.log(data)
    this.http
      .post(
        this.doctorLoginUrl, data)
      .subscribe((response: any) => {
        console.log(response);
        if(response.status == 403){
          return  Swal.fire({
            title: `Login Failed`,
            text: 'The email has not been registered',
            icon: 'warning',
          })
        }
        const token = response.token;
        this.token = token;
        this.authInfo = response;
        if (token) {
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.saveAuthData(this.authInfo);
          this.router.navigate(['/reports']);
          return this.authInfo;
        }
      }, (err) => {
        console.log(err);
         return  Swal.fire({
            title: `Login Failed`,
            text: `Please check your email or password`,
            icon: 'warning',
          })
      
      });
  }
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return observableOf(this.isAuthenticated);
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  saveAuthData(userinfo) {
    localStorage.setItem("token", userinfo.token);
    localStorage.setItem("user_id", this.authInfo.user_id);
    localStorage.setItem("email", this.authInfo.email);
    localStorage.setItem('name', userinfo.name);
  }
  getAuthData() {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const userid = localStorage.getItem("user_id");
    if (!token) {
      return;
    }
    return {
      token: token,
      name: name,
      email: email,
      userid: userid,
    }
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userid");
    this.router.navigate(['/login']);
  }
}
