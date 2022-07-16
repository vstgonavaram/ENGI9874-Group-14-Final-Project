import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  Location
} from "@angular/common";
import { GlobalConstants } from 'src/app/constants/global-constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  @Output() public userLoad: EventEmitter < any > = new EventEmitter();

  userDetails: any = null;
  user: any = null;
  allowedPaths: string[] = ["/terms", "/privacy", "/support", "/register"];
  GlobalConstants = GlobalConstants;
  constructor(private http: HttpClient, private router: Router, location: Location,) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')!);
    this.user = JSON.parse(localStorage.getItem('userDetails')!);
    this.userLoaded(this.userDetails);
    let currentLocation = location.path().split('?')[0];
    if (!this.allowedPaths.some(ap => ap == currentLocation))
      this.checkLoggedIn();
  }

  userLoaded(userDetails: any) {
   
    this.userLoad.emit(userDetails);
  }


  checkLoggedIn() {
    if (JSON.parse(localStorage.getItem('userDetails')!) === undefined || JSON.parse(localStorage.getItem('userDetails')!) === null) {
        this.router.navigate(['']);
    }
  }

  login(username: string, password: string) {
    let data = {
      email: username,
      password: password
    };
    return this.http.post < any > (GlobalConstants.API_URL + 'api/v2/account/login', data)
      .pipe(map((response: { status: any; data: any; }) => {
        this.afterLogin(response);
        return response;
      }));
  }

  register(registerData: any) {
    return this.http.post < any > (GlobalConstants.API_URL + 'api/v2/account/register', registerData)
      .pipe(map(response => {
        return response;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    // this.modalService.dismissAll();
    localStorage.removeItem('user');
    localStorage.removeItem('userDetails');
    this.userDetails = null;
    this.userLoaded(this.userDetails);
    //this.checkLoggedIn();
    this.router.navigate(['/login']);
  }

  afterLogin(loginResponse: { status: any; data: any; }) {
    if (loginResponse.status) {
      this.userDetails = loginResponse.data;

      if (this.userDetails.user.selectedRoleName == this.GlobalConstants.RoleJson.superAdmin) {
        this.userDetails.isSuperAdmin = true;
      }

      localStorage.setItem('userDetails', JSON.stringify(loginResponse.data));
      if (this.userDetails.isSuperAdmin == true || this.userDetails.isSAdmin == true) {
        this.userDetails.permissions = {};
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
        this.userLoaded(this.userDetails);
      }

      this.userLoaded(this.userDetails);
    }
  }

  setUserData(userDetails: any) {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  setUser(user: any) {
    let userDetails = this.getLoggedInUser();

    userDetails.user = user;

    this.afterLogin({
      status: true,
      data: userDetails
    });

  }


  getLoggedInUser() {
    if (this.userDetails !== undefined || this.userDetails !== null) {
      return this.userDetails;
    } else {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails')!);
      this.userLoaded(this.userDetails);
      return this.userDetails;
    }
  }

  getUserData() {
    return this.getLoggedInUser().user;
  }

  isUserLoggedIn() {
    return !(this.getLoggedInUser() === undefined || this.getLoggedInUser() === null);
  }

  isSuperAdmin() {
    if (this.userDetails.user.selectedRoleName == this.GlobalConstants.RoleJson.superAdmin) {
      return true;
    } else {
      return false;
    }
  }

  isStudent() {
    if (this.userDetails.user.selectedRoleName == this.GlobalConstants.RoleJson.student) {
      return true;
    } else {
      return false;
    }
  }

  isUnivUser() {
    if (this.userDetails.user.selectedRoleName == this.GlobalConstants.RoleJson.univUser) {
      return true;
    } else {
      return false;
    }
  }


}


