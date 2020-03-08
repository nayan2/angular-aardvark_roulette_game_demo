import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    loaderActive = false;
    endPointUrl: string;
    constructor(private spinner: NgxSpinnerService){
        this.endPointUrl = environment.endPointUrl;
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(!this.loaderActive) {
            this.spinner.show();
            this.loaderActive = true;
        }

        request = request.clone({ url: this.endPointUrl + request.url });
       
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.loaderActive = true;
                }
                return event;
            }), catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }), finalize(() => {
                this.spinner.hide();
                this.loaderActive = false;
            })
        );
    
    }
}