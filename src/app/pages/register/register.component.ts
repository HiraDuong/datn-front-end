import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
    MESSAGE_REGISTER_FAILED,
    MESSAGE_REGISTER_SUCCESS,
} from '../../utils/constants.util';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'], // Chỉnh sửa từ styleUrl thành styleUrls
})
export class RegisterComponent {
    registerForm: any;
    registerFormError = {
        message: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    };

    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {}

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    this.matchPassword(),
                ],
            ],
        });
    }

    matchPassword() {
        return (control: AbstractControl) => {
            const parent = control.parent;
            if (!parent) return null;

            const passwordControl = parent.get('password');
            if (!passwordControl) return null;

            return passwordControl.value !== control.value ? { matchPassword: true } : null;
        };
    }

    handleFormValidation() {
        this.resetErrorMessages();

        const controls = {
            email: this.registerForm.get('email'),
            username: this.registerForm.get('username'),
            password: this.registerForm.get('password'),
            confirmPassword: this.registerForm.get('confirmPassword'),
        };

        this.registerFormError.email = this.getErrorMessage(controls.email, {
            required: 'Email is required',
            email: 'Invalid email format',
        });

        this.registerFormError.username = this.getErrorMessage(controls.username, {
            required: 'Username is required',
            minlength: `Username must be at least ${controls.username.errors?.minlength.requiredLength} characters long`,
        });

        this.registerFormError.password = this.getErrorMessage(controls.password, {
            required: 'Password is required',
            minlength: `Password must be at least ${controls.password.errors?.minlength.requiredLength} characters long`,
        });

        this.registerFormError.confirmPassword = this.getErrorMessage(controls.confirmPassword, {
            required: 'Confirm password is required',
            matchPassword: 'Passwords do not match',
        });

        // Log error message for debugging purposes
        console.log('registerForm', this.registerForm.value);
        console.log('registerFormErrors', this.registerForm.errors);
        console.log('registerFormError', this.registerFormError);
    }

    resetErrorMessages() {
        this.registerFormError = {
            message: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        };
    }

    getErrorMessage(control: AbstractControl, messages: { [key: string]: string }) {
        for (const errorKey in messages) {
            if (control.hasError(errorKey)) {
                return messages[errorKey];
            }
        }
        return '';
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value).subscribe(
                (next) => {
                    console.log(MESSAGE_REGISTER_SUCCESS);
                    this.router.navigate(['/login']);
                },
                (error) => {
                    console.log(MESSAGE_REGISTER_FAILED);
                    this.registerFormError.message = error.message;
                },
            );
        } else {
            this.registerFormError.message = 'Please enter all required information';
            this.handleFormValidation();
            console.log('registerForm invalid');
        }
    }
}
