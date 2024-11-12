import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { ListCourseDTO } from '../../../types/dtos/course.dto';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'], // Chỉnh sửa từ 'styleUrl' thành 'styleUrls'
})
export class CourseListComponent implements OnInit {
  courses: ListCourseDTO[] = [];
  totalRecords: number = 0;
  currentPage: number = 1;
  limit: number = 10; // số lượng khóa học mỗi trang
  loading: boolean = false; // Biến để quản lý trạng thái loading

  constructor(private readonly courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true; // Bắt đầu loading
    this.courseService.listCourses(this.limit, this.currentPage).subscribe({
      next: (response) => {
        this.courses = response.data;
        this.totalRecords = response.totalRecords ?? 0;
        this.loading = false; // Kết thúc loading
      },
      error: (err) => {
        console.error(err);
        this.loading = false; // Kết thúc loading trong trường hợp lỗi
      },
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadCourses();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCourses();
    }
  }
}
