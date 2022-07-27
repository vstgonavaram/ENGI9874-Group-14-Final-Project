import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe, tap } from 'rxjs';
import { GlobalConstants } from '../constants/global-constants';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor( private apiService: ApiService,
    private httpClient: HttpClient, ) { }

  GetPrograms():Observable<any> {
 
      return this.apiService.get('viewProgram');

    // return new Observable((observer)=> {
    //   observer.next([
    //     {
    //       id: 'MSC123',
    //       name: 'Computer Science - Work Term',
    //       durationInMonths: 24,
    //       description: 'The work term route Master’s program in Computer Science is a two-year program intended for students who wish to further develop their knowledge in Computer Science by expanding their expertise across a wide variety of fields, including Computer Graphics, Computational Theory, Algorithms, Data Visualization and Advanced Interaction Techniques, and be exposed to experience in applied computing as an student employee in a company within the information technology sector. Thus, students in this program are expected to have a Bachelor’s degree in Computer Science, or a similar degree in a related field, such as computer engineering, information technology, and other computing-related sciences.'
    //     },
    //     {
    //       id: 'MSC126',
    //       name: 'Computer Science - Thesis',
    //       durationInMonths: 24,
    //       description: 'The work term route Master’s program in Computer Science is a two-year program intended for students who wish to further develop their knowledge in Computer Science by expanding their expertise across a wide variety of fields, including Computer Graphics, Computational Theory, Algorithms, Data Visualization and Advanced Interaction Techniques, and be exposed to experience in applied computing as an student employee in a company within the information technology sector. Thus, students in this program are expected to have a Bachelor’s degree in Computer Science, or a similar degree in a related field, such as computer engineering, information technology, and other computing-related sciences.'
    //     },
    
    //   ])
    // })
  }

  ApplyForProgram(data: any): Observable<any> {
    return this.apiService.post(`addProgram`, data)
    // .pipe(tap(response => {
    //   return response
    // }))

    // return new Observable((observer)=> {
    //   observer.next({
    //     status: true
    //   })
    // })
  }

}
