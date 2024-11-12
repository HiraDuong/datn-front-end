import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginDTO, RegisterDTO } from '../../types/dtos/auth.dto';
import { catchError, Observable, Observer, tap, throwError } from 'rxjs';
import { BEResponse } from '../../types/model/response.type';
import { CODE_CREATED, CODE_SUCCESS } from '../../utils/constants.util';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user/user.service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../types/model/jwt-payload.type';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = environment.apiUrl + '/auth';
  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService,
    private readonly userService: UserService,
  ) {}

  // TODO : Cookie
  setToken(token: string) {
    this.cookieService.set('jwt', token); // Lưu token vào cookie
  }

  getToken() {
    return this.cookieService.get('jwt'); // Lấy token từ cookie
  }

  deleteToken() {
    this.cookieService.delete('jwt'); // Xóa token
  }

  // TODO : Auth
  // ? Login
  login(loginDto: LoginDTO): Observable<BEResponse> {
    return this.http.post<BEResponse>(`${this.authUrl}/login`, loginDto).pipe(
      tap((res: BEResponse) => {
        if (res.code == CODE_SUCCESS) {
          this.setToken(res.data);
          // decode jwt token and set user id
          const decodedToken: JwtPayload = jwtDecode(res.data);
          this.userService.setUserId(decodedToken.id);
          this.userService.setUserInfo(decodedToken);
          console.log('User ID:', this.userService.getUserId());
          console.log('User info:', this.userService.getUserInfo());
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  // ? Register
  register(user: RegisterDTO): Observable<BEResponse> {
    return this.http.post<BEResponse>(`${this.authUrl}/register`, user).pipe(
      tap((res: BEResponse) => {
        if (res.code === CODE_CREATED) {
          this.setToken(res.data.token);
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
}
