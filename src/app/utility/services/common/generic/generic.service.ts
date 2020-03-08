import { Injectable } from '@angular/core';
import { LogService } from 'src/app/utility/services/common/log/log.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(protected http: HttpClient,
              protected logging: LogService) { }

  get(methodName: string, urlParams: HttpParams = new HttpParams()): Observable<any> {
    this.logging.logToLocal(`GET ...${ methodName }`);
    return this.http.get(methodName, { params: urlParams })
    .pipe(catchError(this.ErrorHandler));
  }

  add(data): Observable<any> {
    return this.http.post('/add', data)
    .pipe(catchError(this.ErrorHandler));
  }

  edit(id: number, data): Observable<any>{
    return this.http.put('/edit/'+ id, data)
    .pipe(catchError(this.ErrorHandler));
  }

  delete(id: number): Observable<any>{
    return this.http.delete('/delete/' + id)
    .pipe(catchError(this.ErrorHandler));
  }

  private ErrorHandler(error: HttpErrorResponse): Observable<any> {
    
    return throwError(error);
  }
}
