import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { ErrorHandlerService } from '../error-handler.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  loaderCount = 0;

  constructor(
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.loaderCount = 0;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var userDetails = this.authService.getLoggedInUser();
    this.manageLoaderCount(true, request);

    if (userDetails !== undefined && userDetails !== null) {
      request = request.clone({
        setHeaders: {
          ProviderUserkey: userDetails.user.userId,
          current_role: userDetails.user.selectedRoleName ? userDetails.user.selectedRoleName : '',
          Authorization: "Bearer " + userDetails.token
        }
      });
    }

    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          this.manageLoaderCount(false, request);
        }
      }, (error: any) => {
        this.manageLoaderCount(false, request);
  
        if (error instanceof HttpErrorResponse) {
          if (error instanceof HttpErrorResponse) {
  
            switch ((<HttpErrorResponse>error).status) {
              case 400:
                return this.handle400Error(error);
              case 401:
                return this.handle401Error(error);
            }
          } else {
            return throwError(() => new Error(error))
         
          }
        }
  
  
      }
    ));
  }

  handle400Error(error: HttpErrorResponse) {
    this.errorHandlerService.addErrors([`Something went wrong!`]);
  }

  handle401Error(error: HttpErrorResponse) {
    this.authService.logout();
    //this.errorHandlerService.addErrors([`Something went wrong!!!`]);
  }

  //isRequest : true if Request, false if Response or Error Response
  manageLoaderCount(isRequest: boolean, request: HttpRequest<any>) {

    if (isRequest)
      this.loaderCount++;
    else
      this.loaderCount--;
    if (this.loaderCount == 1) {
      this.spinner.show();
    }
    else if (this.loaderCount == 0) {
      // setTimeout(() => {
      this.spinner.hide();
      // }, 100);
    }
  }
}
