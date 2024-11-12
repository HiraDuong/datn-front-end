// vocabulary-management.component.ts
import { Component, OnInit } from '@angular/core';
import { ListVocabularyDTO } from '../../../../types/dtos/vocabulary.dto';
import { VocabularyService } from '../../../../services/vocabulary/vocabulary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vocabulary-management',
  templateUrl: './vocabulary-management.component.html',
  styleUrls: ['./vocabulary-management.component.css'],
})
export class VocabularyManagementComponent implements OnInit {
  vocabularies: ListVocabularyDTO[] = []; // Danh sách từ vựng
  currentPage: number = 1; // Trang hiện tại
  limit: number = 10; // Số lượng từ vựng trên mỗi trang
  totalRecords: number = 0; // Tổng số từ vựng
  loading: boolean = true; // Trạng thái loading

  constructor(
    private vocabularyService: VocabularyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVocabularies(); // Tải danh sách từ vựng khi khởi tạo component
  }

  loadVocabularies(): void {
    this.loading = true; // Bắt đầu loading
    this.vocabularyService.listVocabulary(this.limit, this.currentPage).subscribe({
      next: (response) => {
        this.vocabularies = response.data; // Gán danh sách từ vựng
        this.totalRecords = response.totalRecords ?? 0; // Gán tổng số từ vựng
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
      this.loadVocabularies(); // Tải lại danh sách từ vựng
    }
  }

  nextPage(): void {
    if (this.currentPage * this.limit < this.totalRecords) {
      this.currentPage++; // Tăng trang hiện tại
      this.loadVocabularies(); // Tải lại danh sách từ vựng
    }
  }

  deleteVocabulary(vocabularyId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa từ vựng này?')) {
      this.vocabularyService.deleteVocabulary(vocabularyId).subscribe({
        next: () => {
          this.loadVocabularies(); // Tải lại danh sách từ vựng sau khi xóa thành công
        },
        error: (err) => {
          console.error(err); // Log lỗi nếu có
        },
      });
    }
  }

  navigateToCreateVocabulary(): void {
    this.router.navigate(['/vocabulary-create']); // Chuyển đến trang tạo từ vựng
  }
}
