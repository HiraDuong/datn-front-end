import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { JwtPayload } from '../../types/model/jwt-payload.type';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  userInfo: JwtPayload | null = null;
  userId: number | null = null;
  userAvatarUrl: string | null = null;
  dropdownOpen = false;
  constructor(private readonly userService: UserService) {}
  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
    if (this.userInfo) {
      this.userId = this.userService.getUserId();
      this.userAvatarUrl = this.userInfo.avatar;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    // Thêm logic logout tại đây
  }
}
