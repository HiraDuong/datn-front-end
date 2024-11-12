import { Component, OnInit } from '@angular/core';
import { BEResponse } from '../../../types/model/response.type';
import { LessonService } from '../../../services/lesson/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { LessonByIdDTO } from '../../../types/dtos/lesson.dto';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'], // Sửa thành styleUrls
})
export class LearnComponent implements OnInit {
  lessonId!: number; // ID của bài học
  lesson!: LessonByIdDTO; // Dữ liệu bài học
  loading: boolean = true; // Trạng thái tải dữ liệu
  errorMessage: string = ''; // Thông báo lỗi

  vocabExpanded: boolean = false; // Trạng thái dropdown từ vựng
  grammarExpanded: boolean = false; // Trạng thái dropdown ngữ pháp
  tasksExpanded: boolean = false; // Trạng thái dropdown bài tập

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
  ) {}

  ngOnInit(): void {
    // Lấy ID từ route
    this.lessonId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Lesson ID:', this.lessonId);
    this.fetchLessonDetails(); // Gọi hàm để lấy chi tiết bài học
  }

  // Hàm gọi API để lấy chi tiết bài học
  private fetchLessonDetails(): void {
    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (response) => {
        this.lesson = response; // Gán dữ liệu bài học
        this.loading = false; // Đặt trạng thái loading là false
      },
      error: (error) => {
        this.errorMessage = error.message; // Gán thông báo lỗi nếu có
        this.loading = false; // Đặt trạng thái loading là false
      },
    });
  }
  toggleVocabulary(): void {
    this.vocabExpanded = !this.vocabExpanded;
  }

  toggleGrammar(): void {
    this.grammarExpanded = !this.grammarExpanded;
  }

  toggleTasks(): void {
    this.tasksExpanded = !this.tasksExpanded;
  }
}
