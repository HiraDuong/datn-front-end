import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../services/lesson/lesson.service';
import { CourseService } from '../../../services/course/course.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizQuestions: any[] = []; // Danh sách câu hỏi quiz
  userAnswers: number[] = []; // Mảng lưu đáp án của người dùng
  score: number = 0; // Điểm số
  isSubmitted: boolean = false; // Trạng thái đã nộp bài
  courseId!: number; // ID của khóa học
  lessonId!: number; // ID của bài học
  userId: number | null = null; // ID của người dùng
  nextLessonId! : number;
  constructor(
    private lessonService: LessonService,
    private userService : UserService,
    private courseService: CourseService,
    private route: ActivatedRoute,  // Dùng ActivatedRoute để lấy tham số từ URL
  ) {}

  ngOnInit(): void {
    // Lấy tham số từ URL
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
      this.userId = this.userService.getUserId()

      console.log('Course ID:', this.courseId, 'Lesson ID:', this.lessonId);
    });

    // Gọi API để lấy câu hỏi quiz
    this.getQuizQuestions(this.courseId, this.lessonId);
  }

  submitQuiz() {
    this.score = 0;
    this.isSubmitted = true;
    this.quizQuestions.forEach((question, index) => {
      if (this.userAnswers[index] === question.correctAnswer) {
        this.score++;
      }
    });
    if (this.score / this.quizQuestions.length > 0.75 && this.userId) {
      this.courseService.createProcess(this.userId, this.courseId, this.lessonId).subscribe(
        (data) => {
          console.log('data', data);

        
        },
        (error) => {
          console.error('Error fetching quiz questions:', error);
        }
      )

    }
    this.nextLessonId = parseInt((this.lessonId).toString() + 1)
  }

  resetQuiz() {
    this.userAnswers = Array(this.quizQuestions.length).fill(null);
    this.score = 0;
    this.isSubmitted = false;
  }

  getQuizQuestions(courseId: number, lessonId: number) {
    this.lessonService.getQuiz().subscribe(
      (data) => {
        console.log('data', data);
        this.quizQuestions = data.data; // Gán danh sách câu hỏi vào quizQuestions
        if (this.quizQuestions)
        this.userAnswers = Array(this.quizQuestions.length).fill(null); // Khởi tạo mảng userAnswers
        console.log('Quiz questions loaded:', this.quizQuestions);
      },
      (error) => {
        console.error('Error fetching quiz questions:', error);
      }
    );
  }
}
