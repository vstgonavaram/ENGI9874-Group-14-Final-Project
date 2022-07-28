import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private apiService: ApiService) { }

  GetApplicationsByStudentId(studentId: any): Observable<any> {
    return this.apiService.get(`viewApplication/${studentId}`);

    // return new Observable((observer)=> {
    //   observer.next([
    //     {
    //       applicationId: 123,
    //       programId: "MSC123",
    //       fileId: 2,
    //       fileName: '',
    //       status: 'Submitted'
    //     }
    //   ])
    // })
  }

  GetAllApplications(): Observable<any> {
    return this.apiService.get(`viewApplication`)
 

    // return new Observable((observer)=> {
    //   observer.next([
    //     {
    //       applicationId: 123,
    //       programId: "MSC123",
    //       fileId: 2,
    //       fileName: '',
    //       status: 'Submitted'
    //     },
    //     {
    //       applicationId: 1234,
    //       programId: "MSC13",
    //       fileId: 4,
    //       fileName: '',
    //       status: 'Submitted'
    //     }

    //   ])
    // })
  }

}
