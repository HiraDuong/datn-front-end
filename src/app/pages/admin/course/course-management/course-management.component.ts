import { Component, OnInit } from '@angular/core';
import { ListCourseDTO } from '../../../../types/dtos/course.dto';
import { CourseService } from '../../../../services/course/course.service';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
})
export class CourseManagementComponent implements OnInit {
  courses: ListCourseDTO[] = []; // Danh sách khóa học
  currentPage: number = 1; // Trang hiện tại
  limit: number = 10; // Số lượng khóa học trên mỗi trang
  totalRecords: number = 0; // Tổng số khóa học
  loading: boolean = true; // Trạng thái loading

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses(); // Tải danh sách khóa học khi khởi tạo component
  }

  loadCourses(): void {
    this.loading = true; // Bắt đầu loading
    this.courseService.listCourses(this.limit, this.currentPage).subscribe({
      next: (response) => {
        this.courses = response.data; // Gán danh sách khóa học
        this.totalRecords = response.totalRecords ?? 0; // Gán tổng số khóa học
        this.loading = false; // Kết thúc loading
      },
      error: (err) => {
        console.error(err); // Log lỗi
        this.loading = false; // Kết thúc loading trong trường hợp lỗi
      },
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--; // Giảm trang hiện tại
      this.loadCourses(); // Tải lại danh sách khóa học
    }
  }

  nextPage(): void {
    if (this.currentPage * this.limit < this.totalRecords) {
      this.currentPage++; // Tăng trang hiện tại
      this.loadCourses(); // Tải lại danh sách khóa học
    }
  }

  deleteCourse(courseId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.loadCourses(); // Tải lại danh sách khóa học sau khi xóa thành công
        },
        error: (err) => {
          console.error(err); // Log lỗi nếu có
        },
      });
    }
  }
}
