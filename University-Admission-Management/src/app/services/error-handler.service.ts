import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private errors = new Subject<string[]>();

  constructor() { }

  public addErrors = (errors: string[]): void =>
    this.errors.next(errors);

  public getErrors = () =>
    this.errors.asObservable();
}
