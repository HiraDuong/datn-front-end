import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import {
  ListCourseDTO,
  CourseByIdDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
} from '../../types/dtos/course.dto';
import { CODE_CREATED, CODE_NO_CONTENT, CODE_SUCCESS } from '../../utils/constants.util';
import { BEResponse } from '../../types/model/response.type';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly courseApiUrl: string = `${environment.apiUrl}/course`;

  constructor(private readonly http: HttpClient) {}

  listCourses(limit: number, page: number): Observable<BEResponse> {
    const offset = (page - 1) * limit; // Tính toán offset cho phân trang
    return this.http
      .get<BEResponse>(`${this.courseApiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS) {
            return response;
          } else {
            throw new Error('Error: Failed to load courses');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }

  getCourseById(courseId: number): Observable<CourseByIdDTO> {
    return this.http.get<BEResponse>(`${this.courseApiUrl}/${courseId}`).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_SUCCESS) {
          return response.data as CourseByIdDTO;
        } else {
          throw new Error('Error: Failed to load course');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  createCourse(data: CreateCourseDTO): Observable<CourseByIdDTO> {
    return this.http.post<BEResponse>(this.courseApiUrl, data).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_CREATED) {
          return response.data as CourseByIdDTO;
        } else {
          throw new Error('Error: Failed to create course');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }

  updateCourse(
    courseId: number,
    data: UpdateCourseDTO,
  ): Observable<any> {
    return this.http
      .put<BEResponse>(`${this.courseApiUrl}/${courseId}`, data)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS ) {
            return response.data ;
          } else {
            throw new Error('Error: Failed to update course');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }

  deleteCourse(courseId: number): Observable<BEResponse> {
    return this.http
      .delete<BEResponse>(`${this.courseApiUrl}/${courseId}`)
      .pipe(
        map((response: BEResponse) => {
          if (response.code === CODE_SUCCESS || CODE_NO_CONTENT) {
            return response;
          } else {
            throw new Error('Error: Failed to delete course');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        }),
      );
  }


  getCourseProcessByUserId(userId:number, courseId : number): Observable<BEResponse> {
    return this.http.get<BEResponse>(`http://localhost:3000/api/v1/process/${userId}/${courseId}/`).pipe(
      map((response: BEResponse) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }
  createProcess(userId: number, courseId: number, lessonId = -1): Observable<BEResponse> {
    const data = {
      userId,
      courseId,
      lessonId,
    };
    return this.http.post<BEResponse>(`http://localhost:3000/api/v1/process`, data).pipe(
      map((response: BEResponse) => {
        if (response.code === CODE_CREATED) {
          return response;
        } else {
          throw new Error('Error: Failed to create course process');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    );
  }
}
