import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import {
  ListGrammarDTO,
  GrammarByIdDTO,
  CreateGrammarDTO,
  UpdateGrammarDTO,
} from '../../types/dtos/grammar.dto';
import { CODE_CREATED, CODE_NO_CONTENT, CODE_SUCCESS } from '../../utils/constants.util';
import { BEResponse } from '../../types/model/response.type';

@Injectable({
  providedIn: 'root',
})
export class GrammarService {
  private readonly grammarApiUrl: string = `${environment.apiUrl}/grammar`;

  constructor(private readonly http: HttpClient) {}

  listGrammar(
    limit: number,
    page: number,
  ): Observable<BEResponse> {
    const offset = (page - 1) * limit; // Tính toán offset cho phân trang

    return this.http.get<BEResponse>(`${this.grammarApiUrl}?limit=${limit}&offset=${offset}`).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS) {
          return response;
        } else {
          throw new Error('Error: Failed to load grammar');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  getGrammarById(grammarId: number): Observable<GrammarByIdDTO> {
    return this.http.get<BEResponse>(`${this.grammarApiUrl}/${grammarId}`).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS) {
          return response.data as GrammarByIdDTO;
        } else {
          throw new Error('Error: Failed to load grammar');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  createGrammar(data: CreateGrammarDTO): Observable<GrammarByIdDTO> {
    return this.http.post<BEResponse>(this.grammarApiUrl, data).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS || CODE_CREATED) {
          return response.data as GrammarByIdDTO;
        } else {
          throw new Error('Error: Failed to create grammar');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  updateGrammar(
    grammarId: number,
    data: UpdateGrammarDTO,
  ): Observable<GrammarByIdDTO> {
    return this.http
      .put<BEResponse>(`${this.grammarApiUrl}/${grammarId}`, data)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS) {
            return response.data as GrammarByIdDTO;
          } else {
            throw new Error('Error: Failed to update grammar');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }

  deleteGrammar(grammarId: number): Observable<BEResponse> {
    return this.http
      .delete<BEResponse>(`${this.grammarApiUrl}/${grammarId}`)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS ||CODE_NO_CONTENT) {
            return response;
          } else {
            throw new Error('Error: Failed to delete grammar');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }
}
