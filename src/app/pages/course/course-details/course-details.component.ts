import { Component, OnInit } from '@angular/core';
import { CourseByIdDTO } from '../../../types/dtos/course.dto';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';
import { LessonService } from '../../../services/lesson/lesson.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  course: CourseByIdDTO | null = null; // Thông tin khóa học
  loading: boolean = true; // Trạng thái tải
  expanded: boolean = false; // Trạng thái mở rộng
  userId: number | null = null;
  courseId: number | null = null;
  process: any = null;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly lessonService: LessonService,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
     this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = this.userService.getUserId();
    // Gọi API để lấy dữ liệu khóa học
    if (this.courseId ){
      this.loadCourse(this.courseId);
    }
    if (this.userId && this.courseId) {
      this.loadProcess(this.userId, this.courseId);
    }
  }

  loadCourse(id: number): void {
    // Gọi API để lấy thông tin khóa học
    this.courseService.getCourseById(id).subscribe({
      next: (response) => {
        this.course = response;
        this.loading = false; // Đánh dấu đã tải xong
        this.lessonService.setCourse(this.course)
      },
      error: (err) => {
        console.error(err);
        this.loading = false; // Đánh dấu đã tải xong ngay cả khi có lỗi
      },
    });
  }

  loadProcess(userId: number, courseId: number): void {
    this.courseService.getCourseProcessByUserId(userId, courseId).subscribe({
      next: (response) => {
        console.log(response);
        this.process = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  createProcess(userId: number, courseId: number)
  {
    this.courseService.createProcess(userId, courseId).subscribe({
      next: (response) => {
        console.log(response);
        this.process = response;
        alert ('Đăng ký khóa học thành công');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  toggleExpanded(): void {
    this.expanded =!this.expanded;
  }
  subscribe() {
    if (this.userId && this.courseId) {
      this.createProcess(this.userId, this.courseId);
    }
  }
}
