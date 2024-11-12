import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import {
  ListVocabularyDTO,
  VocabularyByIdDTO,
  CreateVocabularyDTO,
  UpdateVocabularyDTO,
} from '../../types/dtos/vocabulary.dto';
import { CODE_CREATED, CODE_NO_CONTENT, CODE_SUCCESS } from '../../utils/constants.util';
import { BEResponse } from '../../types/model/response.type';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  private readonly vocabularyApiUrl: string = `${environment.apiUrl}/vocabulary`;

  constructor(private readonly http: HttpClient) {}

  listVocabulary(
    limit: number,
    page: number,
  ): Observable<BEResponse> {
    const offset = (page - 1) * limit; // Tính toán offset cho phân trang
    return this.http.get<BEResponse>(`${this.vocabularyApiUrl}?limit=${limit}&offset=${offset}`).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS) {
          return response;
        } else {
          throw new Error('Error: Failed to load vocabulary');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  getVocabularyById(vocabularyId: number): Observable<VocabularyByIdDTO> {
    return this.http
      .get<BEResponse>(`${this.vocabularyApiUrl}/${vocabularyId}`)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS) {
            return response.data as VocabularyByIdDTO;
          } else {
            throw new Error('Error: Failed to load vocabulary');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }

  createVocabulary(data: CreateVocabularyDTO): Observable<VocabularyByIdDTO> {
    return this.http.post<BEResponse>(this.vocabularyApiUrl, data).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS) {
          return response.data as VocabularyByIdDTO;
        } else {
          throw new Error('Error: Failed to create vocabulary');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  updateVocabulary(
    vocabularyId: number,
    data: UpdateVocabularyDTO,
  ): Observable<VocabularyByIdDTO> {
    return this.http
      .put<BEResponse>(`${this.vocabularyApiUrl}/${vocabularyId}`, data)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS) {
            return response.data as VocabularyByIdDTO;
          } else {
            throw new Error('Error: Failed to update vocabulary');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }

  deleteVocabulary(vocabularyId: number): Observable<BEResponse> {
    return this.http
      .delete<BEResponse>(`${this.vocabularyApiUrl}/${vocabularyId}`)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_NO_CONTENT) {
            return response;
          } else {
            throw new Error('Error: Failed to delete vocabulary');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }
}
