import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, Observer, tap, throwError } from 'rxjs';
import {
  UserByIdDTO,
  UserListDTO,
  UserUpdatedDTO,
} from '../../types/dtos/user.dto';
import { BEResponse } from '../../types/model/response.type';
import { CODE_SUCCESS } from '../../utils/constants.util';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../types/model/jwt-payload.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  id: number | null = null;
  userInfo: any;
  userApiUrl: string = `${environment.apiUrl}/user`;
  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService,
  ) {
    // get token from cookie if available
    const token = this.cookieService.get('jwt');
    if (token) {
      const decodeToken: JwtPayload = jwtDecode(token);
      this.setUserInfo(decodeToken);
      this.setUserId(decodeToken.id);
    }
  }

  setUserId(id: number): void {
    this.id = id;
  }

  getUserId(): number | null {
    return this.id;
  }

  clearUserId(): void {
    this.id = null;
  }

  getUserInfo(): JwtPayload | null {
    return this.userInfo;
  }
  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
  }

  clearUserInfo() {
    this.userInfo = null;
  }

  listUsers(limit: number, page: number): Observable<BEResponse> {
    const offset = (page - 1) * limit; // Tính toán offset cho phân trang
    return this.http
      .get<BEResponse>(`${this.userApiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS) {
            return response;
          } else {
            throw new Error('Error: Failed to load users');
          }
        }),
        catchError((error) => {
          throw new Error(error.message);
        }),
      );
  }

  getUserById(userId: number): Observable<UserByIdDTO> {
    return this.http.get<BEResponse>(`${this.userApiUrl}/${userId}`).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS) {
          return response.data as UserByIdDTO;
        } else {
          throw new Error('Error: Failed to load user');
        }
      }),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  updateUserById(userId: number, data: any): Observable<UserUpdatedDTO> {
    return this.http.put<BEResponse>(`${this.userApiUrl}/${userId}`, data).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS) {
          return response.data as UserUpdatedDTO;
        } else {
          throw new Error('Error: Failed to update user');
        }
      }),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  deleteUserById(userId: number): Observable<BEResponse> {
    return this.http.delete<BEResponse>(`${this.userApiUrl}/${userId}`).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS) {
          return response;
        } else {
          throw new Error('Error: Failed to delete user');
        }
      }),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
}
