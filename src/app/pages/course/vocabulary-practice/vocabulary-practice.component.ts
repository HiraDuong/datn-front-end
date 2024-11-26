import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../services/lesson/lesson.service';
import { VocabularyService } from '../../../services/vocabulary/vocabulary.service';

@Component({
  selector: 'app-vocabulary-practice',
  templateUrl: './vocabulary-practice.component.html',
  styleUrls: ['./vocabulary-practice.component.css']
})
export class VocabularyPracticeComponent implements OnInit, OnDestroy {
  flipped = false;
  lessonId!: number;
  courseId!: number;
  vocabulary: any[] = [];
  currentVocabularyIndex: number = 0;
  itemsPerPage: number = 1;
  loading: boolean = true;
  errorMessage: string = '';
  quizzes: any[] = [];
  score: number = 0;
  timerSeconds: number = 15;
  timerInterval: any;
  timerEnabled: boolean = false; // Biến để kiểm tra chế độ bật/tắt tính giờ
  selectedAnswer: any;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private vocabularyService: VocabularyService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.lessonId = +params['lessonId'];
      this.courseId = +params['courseId'];
    });

    this.fetchVocabulary();
  }

  // Lấy danh sách từ vựng từ API
  fetchVocabulary(): void {
    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (response) => {
        this.vocabulary = response.vocabulary;
        this.loading = false;
        this.generateQuiz();
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  // Sinh ngẫu nhiên câu hỏi trắc nghiệm từ danh sách từ vựng
  generateQuiz(): void {
    this.vocabulary.forEach(vocab => {
      const selectedVocabulary = this.getRandomElements(this.vocabulary, 4);
      const correctAnswer = selectedVocabulary[Math.floor(Math.random() * 4)];

      const questionType = this.getRandomQuestionType();
      const questionValue = correctAnswer[questionType];

      const answers = this.generateAnswers(correctAnswer, selectedVocabulary, questionType);

      this.quizzes.push({
        question: `Chọn ${questionType === 'word' ? 'từ' : questionType === 'pronunciation' ? 'phát âm' : 'nghĩa'} đúng của ${
          questionType === 'word' ? correctAnswer.meaning : questionType === 'pronunciation' ? correctAnswer.word : correctAnswer.word
        }`,
        answers: answers,
        correctAnswer: questionValue
      });
    });

    // Nếu chế độ tính giờ được bật, gọi startTimer
    if (this.timerEnabled) {
      this.startTimer();
    }
  }

  // Lấy ngẫu nhiên một số phần tử từ mảng
  getRandomElements(array: any[], numElements: number): any[] {
    const shuffledArray = this.shuffleArray(array);
    return shuffledArray.slice(0, numElements);
  }

  // Trộn mảng
  shuffleArray(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  // Chọn ngẫu nhiên một thuộc tính để hỏi (word, pronunciation, or meaning)
  getRandomQuestionType(): string {
    const types = ['word', 'pronunciation', 'meaning'];
    return types[Math.floor(Math.random() * types.length)];
  }

  // Tạo các đáp án cho câu hỏi trắc nghiệm
  generateAnswers(correctAnswer: any, selectedVocabulary: any[], questionType: string): string[] {
    const answers = [correctAnswer[questionType]]; // Đáp án đúng theo thuộc tính được chọn
    selectedVocabulary.forEach(vocab => {
      if (vocab !== correctAnswer) {
        answers.push(vocab[questionType]); // Lấy đáp án từ thuộc tính được chọn
      }
    });
    return this.shuffleArray(answers);
  }

  // Kiểm tra câu trả lời và tính điểm
  checkAnswer(answer: string): void {
    this.selectedAnswer = answer;
    const correctAnswer = this.quizzes[this.currentVocabularyIndex].correctAnswer;

    if (answer === correctAnswer) {
      this.score += 1;
    }


  }

  // Bắt đầu bộ đếm thời gian
  startTimer(): void {
    if (this.timerEnabled) {
      this.timerInterval = setInterval(() => {
        this.timerSeconds -= 1;
        if (this.timerSeconds <= 0) {
          this.timerSeconds = 15;
          this.goToNextQuestion();
        }
      }, 1000);
    }
  }

  // Chuyển câu hỏi tiếp theo
  goToNextQuestion(): void {
    if (this.currentVocabularyIndex < this.quizzes.length - 1) {
      this.currentVocabularyIndex++;
      this.timerSeconds = 15;

    } else {
      // Nếu đã đến câu hỏi cuối cùng, dừng timer và hiển thị kết quả
      this.endQuiz();
    }
    this.selectedAnswer = null;
  }


  // Chuyển câu hỏi trước đó
  goToPreviousQuestion(): void {
    if (this.currentVocabularyIndex > 0) {
      this.currentVocabularyIndex--;
    }
  }

  // Hủy bỏ bộ đếm thời gian khi component bị hủy
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Hàm để chuyển chế độ bật/tắt bộ đếm thời gian
  toggleTimer(): void {
    this.timerEnabled = !this.timerEnabled;
    if (this.timerEnabled) {
      this.startTimer();
    } else {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
    }
  }
  endQuiz(): void {
    // Dừng timer khi bài kiểm tra kết thúc
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerEnabled = false;
  }
  startNewQuiz(): void {
    this.currentVocabularyIndex = 0;
    this.itemsPerPage = 1;
    this.errorMessage = '';
    this.quizzes = [];
    this.score = 0;
    this.timerSeconds = 15;
    this.timerInterval = null;
    this.timerEnabled = false; // Biến để kiểm tra chế độ bật/tắt tính giờ
    this.selectedAnswer = null;
    this.generateQuiz()

  }
}
