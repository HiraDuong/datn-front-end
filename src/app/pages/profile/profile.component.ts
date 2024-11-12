import { Component } from '@angular/core';
import { UserByIdDTO, UserUpdatedDTO } from '../../types/dtos/user.dto';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userInfo!: UserByIdDTO;
  userId: number | null = null;
  loading: boolean = false;
  showEditForm: boolean = false;
  editForm!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
  ) {}

  ngOnInit() {
    this.userId = this.userService.getUserId();
    console.log('id', this.userId);
    if (this.userId) {
      this.loadUserInfo(this.userId);
    }
  }
  loadUserInfo(id: number) {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (response) => {
        this.userInfo = response;
        console.log(this.userInfo);
        this.loading = false;
        this.initForm();
      },
      error: (err) => {
        console.error('Error loading user info:', err);
        this.loading = false;
      },
    });
  }

  displayEditForm() {
    this.showEditForm = true;
  }

  initForm() {
    this.editForm = this.fb.group(
      {
        username: [
          this.userInfo.username,
          [Validators.required, Validators.minLength(3)],
        ],
        email: [this.userInfo.email, [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6)]],
        confirmPassword: [''],
        avatar: [''],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  editUser() {
    if (!this.userId) return;
    if (!this.editForm?.valid) return;

    const updatedData: UserUpdatedDTO = {
      username: this.editForm.value.username,
      email: this.editForm.value.email,
      avatar: this.editForm.value.avatar,
      password: this.editForm.value.password || undefined, // Chỉ gửi password nếu người dùng đã nhập
    };

    this.userService.updateUserById(this.userId, updatedData).subscribe({
      next: (response) => {
        alert('User profile updated successfully!');
        this.loadUserInfo(this.userId!); // Load lại thông tin sau khi cập nhật
        this.showEditForm = false; // Ẩn form sau khi lưu
      },
      error: (err) => {
        console.error('Error updating user info:', err);
        alert('Failed to update profile.');
      },
    });
  }
}
