import { Component } from '@angular/core';
import { UserUpdatedDTO } from '../../types/dtos/user.dto';
import { UserRole } from '../../utils/constants.util';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent {
    userForm!: FormGroup;
    user: UserUpdatedDTO = {
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        role: UserRole.Admin,
        avatar: 'https://example.com/avatar.jpg',
    };
    isEditing = false;

    constructor(private readonly fb: FormBuilder) {}

    ngOnInit(): void {
        // Initialize the form with the user data
        this.userForm = this.fb.group({
            username: [this.user.username],
            email: [this.user.email],
            role: [this.user.role],
            avatar: [this.user.avatar],
        });
    }

    updateUser() {
        // Logic to update user profile
        console.log('User updated:', this.userForm.value);
        this.isEditing = false; // Stop editing
    }

    editProfile() {
        this.isEditing = true; // Enable editing
    }
}
