import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalConstants } from 'src/app/constants/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(   private http: HttpClient) { }


  private formatErrors(error: any) {
    // catchError(err => Observable.throw(error))
    //console.log(error)
    return  throwError(() => new Error(error.error));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${GlobalConstants.API_URL}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const postReq = new HttpRequest('PUT', GlobalConstants.API_URL + path, body, {
      headers: headers
    });
    return this.http.request(postReq)
    .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    let HTTPHeaders = new HttpHeaders();
    HTTPHeaders.append('Content-Type', 'application/json');
    HTTPHeaders.append('Accept', 'application/json');

    let options = { headers: HTTPHeaders };
    return this.http.post(GlobalConstants.API_URL + path, body, options)
     .pipe(catchError(this.formatErrors));
  }

  delete(path: any): Observable<any> {
    return this.http.delete(
      `${GlobalConstants.API_URL}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  upload(uploadRequest: HttpRequest<any>):Observable<any>{
    return this.http.request(uploadRequest)
    .pipe(catchError(this.formatErrors));
  }
}
