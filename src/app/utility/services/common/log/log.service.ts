import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private localLog: BehaviorSubject<string>;
  constructor() {
    this.localLog = new BehaviorSubject('')
  }

  logToLocal = (message: string): void => {
    var now = new Date();
    this.localLog.next(now.toISOString() + ' ' + message + '\r\n');
  }

  getLocalLog = ():BehaviorSubject<string> => {
    return this.localLog;
  }

  
}
