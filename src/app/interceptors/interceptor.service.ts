import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
}
    from '@angular/common/http';
import { BehaviorSubject, finalize, Observable, retry, retryWhen } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    public cont = new BehaviorSubject<Number>(0)

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe();
    }
}