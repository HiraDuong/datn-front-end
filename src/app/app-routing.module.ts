import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { CourseListComponent } from './pages/course/course-list/course-list.component';
import { CourseDetailsComponent } from './pages/course/course-details/course-details.component';
import { LearnComponent } from './pages/course/learn/learn.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { UserDetailComponent } from './pages/admin/user-detail/user-detail.component';
import { CourseManagementComponent } from './pages/admin/course/course-management/course-management.component';
import { CourseDetailComponent } from './pages/admin/course/course-detail/course-detail.component';
import { LessonCreateComponent } from './pages/admin/course/lesson-create/lesson-create.component';
import { VocabularyManagementComponent } from './pages/admin/vocabulary/vocabulary-management/vocabulary-management.component';
import { GrammarManagementComponent } from './pages/admin/grammar/grammar-management/grammar-management.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'course',
    component: CourseListComponent,
  },
  {
    path: 'course/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'learn/:id',
    component: LearnComponent,
  },
  { path: 'admin/users', component: UserManagementComponent },
  { path: 'admin/user-detail/:id', component: UserDetailComponent },
  { path: 'admin/courses', component: CourseManagementComponent },
  { path: 'admin/course-detail/:id', component: CourseDetailComponent },
  { path: 'admin/course-detail', component: CourseDetailComponent },
  { path: 'admin/courses-create-lesson/:id', component: LessonCreateComponent },
  { path: 'admin/vocabularies', component: VocabularyManagementComponent },
  { path: 'admin/grammars', component: GrammarManagementComponent },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
