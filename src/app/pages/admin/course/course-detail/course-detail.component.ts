import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseByIdDTO } from '../../../../types/dtos/course.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../../services/course/course.service';
import { LessonService } from '../../../../services/lesson/lesson.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  courseForm!: FormGroup;
  course: CourseByIdDTO | null = null;
  courseId: number | null = null;
  loading: boolean = false;

  constructor(
    private readonly courseService: CourseService,
    private readonly lessonService: LessonService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
  description: ['', [Validators.required]],
  duration: [null, [Validators.required, Validators.min(1)]],
  avatar: ['', [Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]]
    });

    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.courseId) {
      this.loadCourse();
    }
  }

  loadCourse(): void {
    if (!this.courseId) return;
    this.loading = true;
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
        this.courseForm.patchValue({
          name: course.name,
          description: course.description,
          duration: course.duration,
          avatar: course.avatar,
        });
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  createCourse() {
    this.courseService.createCourse(this.courseForm.value).subscribe({
      next: (course) => {
        alert('Khóa học đã được tạo thành công.');
        this.router.navigate(['/admin/courses', course.id]);
      },
      error: (err) => {
        console.error(err);
        alert('Có lỗi xảy ra khi tạo khóa học.');
      },
    });
  }
  updateCourse() {
    if (this.courseId) {
      this.courseService
        .updateCourse(this.courseId, this.courseForm.value)
        .subscribe({
          next: () => {
            alert('Khóa học đã được cập nhật thành công.');
            this.loadCourse();
          },
          error: (err) => {
            console.error(err);
            alert('Có lỗi xảy ra khi cập nhật khóa học.');
          },
        });
    }
  }
  deleteCourse(): void {
    if (this.courseId) {
      if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
        this.courseService.deleteCourse(this.courseId).subscribe({
          next: () => {
            alert('Khóa học đã được xóa thành công.');
            this.router.navigate(['/admin/courses']); // Chuyển hướng đến danh sách khóa học
          },
          error: (err) => {
            console.error(err);
            alert('Có lỗi xảy ra khi xóa khóa học.');
          },
        });
      }
    }
  }
  deleteLesson(lessonId: number) {
    if (confirm('Bạn có chắc chắn muốn xóa bài học này?')) {
      this.lessonService.deleteLesson(lessonId).subscribe({
        next: () => {
          alert('Bài học đã được xóa thành công.');
          this.loadCourse();
        },
        error: (err) => {
          console.error(err);
          alert('Có lỗi xảy ra khi xóa bài học.');
        },
      });
    }
  }

}
