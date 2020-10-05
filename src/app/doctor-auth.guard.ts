import Swal from 'sweetalert2';
import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild, Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  DoctorService
} from './services/doctor.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthGuard implements CanActivateChild {
  constructor(private authservice: DoctorService, private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    const isAuth = this.authservice.getIsAuth();
    if (isAuth && localStorage.getItem('token') != null) {
      return true;
    }

    this.router.navigate(['/login']);
    return Swal.fire({
      title: `Unauthorised`,
      text: 'Please login to continue',
      icon: 'warning',
    }), false
  }
}
