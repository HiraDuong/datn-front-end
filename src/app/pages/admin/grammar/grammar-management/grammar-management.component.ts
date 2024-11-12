import { Component } from '@angular/core';
import { ListGrammarDTO } from '../../../../types/dtos/grammar.dto';
import { GrammarService } from '../../../../services/grammar/grammar.service';

@Component({
  selector: 'app-grammar-management',
  templateUrl: './grammar-management.component.html',
  styleUrl: './grammar-management.component.css'
})
export class GrammarManagementComponent {
navigateToCreateGrammar() {
throw new Error('Method not implemented.');
}
  grammars: ListGrammarDTO[] = []; // Danh sách ngữ pháp
  currentPage: number = 1; // Trang hiện tại
  limit: number = 10; // Số lượng ngữ pháp trên mỗi trang
  totalRecords: number = 0; // Tổng số ngữ pháp
  loading: boolean = true; // Trạng thái loading

  constructor(private grammarService: GrammarService) {}

  ngOnInit(): void {
    this.loadGrammars(); // Tải danh sách ngữ pháp khi khởi tạo component
  }

  loadGrammars(): void {
    this.loading = true; // Bắt đầu loading
    this.grammarService.listGrammar(this.limit, this.currentPage).subscribe({
      next: (response) => {
        this.grammars = response.data; // Gán danh sách ngữ pháp
        this.totalRecords = response.totalRecords ?? 0; // Gán tổng số ngữ pháp
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
      this.loadGrammars(); // Tải lại danh sách ngữ pháp
    }
  }

  nextPage(): void {
    if (this.currentPage * this.limit < this.totalRecords) {
      this.currentPage++; // Tăng trang hiện tại
      this.loadGrammars(); // Tải lại danh sách ngữ pháp
    }
  }

  deleteGrammar(grammarId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa ngữ pháp này?')) {
      this.grammarService.deleteGrammar(grammarId).subscribe({
        next: () => {
          this.loadGrammars(); // Tải lại danh sách ngữ pháp sau khi xóa thành công
        },
        error: (err) => {
          console.error(err); // Log lỗi nếu có
        },
      });
    }
  }
}
