import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
}
    from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    public cont: number = 0

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.cont === 0)
            this.cont++
        
        return next.handle(request).pipe(finalize(() => {
            this.cont--
        }));
    }
}