/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-12 15:54:13
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-21 02:11:45
 * @ Description: Lấy jwt token và thêm vào header của request
 */

import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly cookieService: CookieService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const token = this.cookieService.get('jwt'); // Lấy token từ cookie
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        return next.handle(request);
    }
}
