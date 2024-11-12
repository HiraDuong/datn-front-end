import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import {
  ListLessonDTO,
  LessonByIdDTO,
  CreateLessonDTO,
  UpdateLessonDTO,
} from '../../types/dtos/lesson.dto';
import { CODE_CREATED, CODE_NO_CONTENT, CODE_SUCCESS } from '../../utils/constants.util';
import { BEResponse } from '../../types/model/response.type';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private readonly lessonApiUrl: string = `${environment.apiUrl}/lesson`;

  constructor(private readonly http: HttpClient) {}

  listLessons(
    limit: number,
    page: number,
    courseId: number,
  ): Observable<BEResponse> {
    const offset = (page - 1) * limit; // Tính toán offset cho phân trang
    return this.http
      .get<BEResponse>(
        `${this.lessonApiUrl}?limit=${limit}&offset=${offset}&courseId=${courseId}`,
      )
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS) {
            return response;
          } else {
            throw new Error('Error: Failed to load lessons');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }

  getLessonById(lessonId: number): Observable<LessonByIdDTO> {
    return this.http.get<BEResponse>(`${this.lessonApiUrl}/${lessonId}`).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS || CODE_CREATED) {
          return response.data as LessonByIdDTO;
        } else {
          throw new Error('Error: Failed to load lesson');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  createLesson(data: CreateLessonDTO): Observable<LessonByIdDTO> {
    return this.http.post<BEResponse>(this.lessonApiUrl, data).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_CREATED) {
          return response.data as LessonByIdDTO;
        } else {
          throw new Error('Error: Failed to create lesson');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  updateLesson(
    lessonId: number,
    data: UpdateLessonDTO,
  ): Observable<LessonByIdDTO> {
    return this.http
      .put<BEResponse>(`${this.lessonApiUrl}/${lessonId}`, data)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS) {
            return response.data as LessonByIdDTO;
          } else {
            throw new Error('Error: Failed to update lesson');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }

  deleteLesson(lessonId: number): Observable<BEResponse> {
    return this.http
      .delete<BEResponse>(`${this.lessonApiUrl}/${lessonId}`)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS || CODE_NO_CONTENT || CODE_CREATED) {
            return response;
          } else {
            throw new Error('Error: Failed to delete lesson');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }
}
