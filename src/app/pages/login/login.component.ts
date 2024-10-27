import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    MESSAGE_LOGIN_FAILED,
    MESSAGE_LOGIN_SUCCESS,
} from '../../utils/constants.util';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginForm!: FormGroup;
    loginFormError = '';

    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {}

    ngOnInit() {
        // Khởi tạo form với FormBuilder
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: [''],
        });
    }

    onSubmit() {
        // Gửi form đi đăng nhập
        if (this.loginForm.valid) {
            // Kiểm tra tính hợp lệ của form
            this.authService.login(this.loginForm.value).subscribe(
                (next) => {
                    console.log(MESSAGE_LOGIN_SUCCESS);
                    this.router.navigate(['/']);
                },
                (error) => {
                    console.log(MESSAGE_LOGIN_FAILED);
                    this.loginFormError = error.message; // Hiển thị thông báo lỗi
                },
            );
        } else {
            this.loginFormError = 'Vui lòng nhập đầy đủ thông tin'; // Hiển thị thông báo lỗi
        }
    }
}
