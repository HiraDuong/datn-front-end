import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { UserListDTO } from '../../../types/dtos/user.dto';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: UserListDTO[] = [];
  currentPage: number = 1;
  limit: number = 10; // Số lượng người dùng trên mỗi trang
  totalRecords: number = 0; // Tổng số người dùng
  loading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.listUsers(this.limit, this.currentPage).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalRecords = response.totalRecords ?? 0;
        this.loading = false; // Kết thúc loading
      },
      error: (err) => {
        console.error(err);
        this.loading = false; // Kết thúc loading trong trường hợp lỗi
      },
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage * this.limit < this.totalRecords) {
      this.currentPage++;
      this.loadUsers();
    }
  }
}
