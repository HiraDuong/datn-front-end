import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserByIdDTO } from '../../../types/dtos/user.dto';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userForm!: FormGroup;
  user: UserByIdDTO | null = null; // Thay đổi kiểu dữ liệu nếu cần
  userId!: number;
  constructor(
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,

    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }], // ID không thể chỉnh sửa
      username: [''],
      email: [''],
      role: [''],
    });
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
      this.userForm.patchValue(user); // Gán giá trị vào form
    });
  }

  deleteUser() {
    if (this.userId) {
      this.userService.deleteUserById(this.userId).subscribe(() => {
        // Xử lý sau khi xóa người dùng thành công
      });
    }
  }

  submit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.userService.updateUserById(this.userId, userData).subscribe(() => {
        // Xử lý sau khi cập nhật thành công
      });
    }
  }
}
