import { Component } from '@angular/core';
import { LessonByIdDTO } from '../../../types/dtos/lesson.dto';
import { CourseByIdDTO } from '../../../types/dtos/course.dto';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../services/lesson/lesson.service';
import { CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-grammar-lesson',
  templateUrl: './grammar-lesson.component.html',
  styleUrl: './grammar-lesson.component.css'
})
export class GrammarLessonComponent {
  lessonId!: number; // ID của bài học
  courseId!: number; // ID của khóa học
  lesson: LessonByIdDTO | null = null; // Dữ liệu bài học
  course: CourseByIdDTO | null = null; // Dữ liệu khóa học
  grammars: any[] = []; // Danh sách từ vựng trong bài học
  loading: boolean = true; // Trạng thái tải dữ liệu
  errorMessage: string = ''; // Thông báo lỗi

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
      console.log('Course ID:', this.courseId, 'Lesson ID:', this.lessonId);
      this.lesson = this.lessonService.getLesson();
      this.course = this.lessonService.getCourse();
      console.log('Lesson:', this.lesson, 'Course:', this.course);
    });


    if (!this.course || !this.lesson) {
      this.fetchLessonDetails();
      this.fetchCourseDetails();
    } else {
      this.loading = false;
    }
  }

  // Hàm gọi API để lấy chi tiết bài học
  private fetchLessonDetails(): void {
    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (response) => {
        this.lesson = response; // Gán dữ liệu bài học
        this.loading = false; // Đặt trạng thái loading là false
        this.grammars = this.lesson.grammar;
      },
      error: (error) => {
        this.errorMessage = error.message; // Gán thông báo lỗi nếu có
        this.loading = false; // Đặt trạng thái loading là false
      },
    });
  }

  // Hàm gọi API để lấy chi tiết khóa học
  private fetchCourseDetails(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (response) => {
        this.course = response; // Gán dữ liệu khóa học
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
