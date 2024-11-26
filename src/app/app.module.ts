import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { LearnComponent } from './pages/course/learn/learn.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CourseListComponent } from './pages/course/course-list/course-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CourseDetailsComponent } from './pages/course/course-details/course-details.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { UserDetailComponent } from './pages/admin/user-detail/user-detail.component';
import { CourseManagementComponent } from './pages/admin/course/course-management/course-management.component';
import { CourseDetailComponent } from './pages/admin/course/course-detail/course-detail.component';
import { LessonCreateComponent } from './pages/admin/course/lesson-create/lesson-create.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { VocabularyManagementComponent } from './pages/admin/vocabulary/vocabulary-management/vocabulary-management.component';
import { GrammarManagementComponent } from './pages/admin/grammar/grammar-management/grammar-management.component';
import { VocabularyComponent } from './pages/course/vocabulary/vocabulary.component';
import { VocabularyLessonComponent } from './pages/course/vocabulary-lesson/vocabulary-lesson.component';
import { VocabularyFlashcardComponent } from './pages/course/vocabulary-flashcard/vocabulary-flashcard.component';
import { VocabularyPracticeComponent } from './pages/course/vocabulary-practice/vocabulary-practice.component';
import { GrammarLessonComponent } from './pages/course/grammar-lesson/grammar-lesson.component';
import { PostComponent } from './components/post/post.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessageComponent } from './pages/message/message.component';
import { QuizComponent } from './pages/course/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LearnComponent,
    ProfileComponent,
    HomeComponent,
    NavComponent,
    SearchBarComponent,
    CourseListComponent,
    LoadingComponent,
    CourseDetailsComponent,
    UserManagementComponent,
    UserDetailComponent,
    CourseManagementComponent,
    CourseDetailComponent,
    LessonCreateComponent,
    AdminNavComponent,
    VocabularyManagementComponent,
    GrammarManagementComponent,
    VocabularyComponent,
    VocabularyLessonComponent,
    VocabularyFlashcardComponent,
    VocabularyPracticeComponent,
    GrammarLessonComponent,
    PostComponent,
    MessageComponent,
    QuizComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
