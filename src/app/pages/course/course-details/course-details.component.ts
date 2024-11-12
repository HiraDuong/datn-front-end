import { Component } from '@angular/core';
import { CourseByIdDTO } from '../../../types/dtos/course.dto';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent {
  course: CourseByIdDTO | null = null; // Thông tin khóa học
  loading: boolean = true; // Trạng thái tải

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse(courseId);
  }

  loadCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe({
      next: (response) => {
        this.course = response;
        this.loading = false; // Đánh dấu đã tải xong
      },
      error: (err) => {
        console.error(err);
        this.loading = false; // Đánh dấu đã tải xong ngay cả khi có lỗi
      },
    });
  }
}
