import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
}
    from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    public cont = new BehaviorSubject<Number>(0)

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.cont.getValue() === 0){
            this.cont.next(1)
        }
        
        return next.handle(request).pipe(finalize(() => {
            this.cont.next(0)
        }));
    }
}