import { Component } from '@angular/core';
import { LessonService } from '../../../services/lesson/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { LessonByIdDTO } from '../../../types/dtos/lesson.dto';
import { ListVocabularyDTO, VocabularyByIdDTO } from '../../../types/dtos/vocabulary.dto';

@Component({
  selector: 'app-vocabulary-flashcard',
  templateUrl: './vocabulary-flashcard.component.html',
  styleUrls: ['./vocabulary-flashcard.component.css']
})
export class VocabularyFlashcardComponent {
  flipped = false;
  lesson: LessonByIdDTO | null = null; // Dữ liệu bài học
  vocabulary: ListVocabularyDTO[] = []; // Dữ liệu từ vựng
  currentVocabularyIndex: number = 0; // Chỉ số của từ vựng hiện tại
  itemsPerPage: number = 1; // Số lượng từ vựng mỗi trang
  lessonId!: number; // ID của bài học
  courseId!: number; // ID của khóa học

  loading: boolean = true; // Trạng thái tải dữ liệu
  errorMessage: string = ''; // Thông báo lỗi


  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.lessonId = params['lessonId'];
      this.courseId = params['courseId'];

      console.log('Lesson ID:', this.lessonId);
    });
    this.lesson = this.lessonService.getLesson();
    console.log('Lesson:', this.lesson);
    if (this.lesson) {
      this.vocabulary = this.lesson.vocabulary;
    } else {
      this.fetchLessonDetails();
    }
    console.log('list vocabulary:', this.vocabulary);
    console.log('lesson:', this.lesson);
    this.loading = false;
  }

  private fetchLessonDetails(): void {
    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (response) => {
        this.lesson = response; // Gán dữ liệu bài học
        this.loading = false; // Đặt trạng thái loading là false
        this.vocabulary = this.lesson.vocabulary;
      },
      error: (error) => {
        this.errorMessage = error.message; // Gán thông báo lỗi nếu có
        this.loading = false; // Đặt trạng thái loading là false
      },
    });
  }

  // Phương thức để chuyển sang trang tiếp theo
  nextCard() {
    if (this.currentVocabularyIndex < this.vocabulary.length - 1) {
      this.currentVocabularyIndex++;
    } else {
      this.currentVocabularyIndex = 0; // Quay lại từ đầu khi hết
    }
  this.flipped = false;

  }

  // Phương thức để quay lại trang trước
  prevCard() {
    if (this.currentVocabularyIndex > 0) {
      this.currentVocabularyIndex--;
    } else {
      this.currentVocabularyIndex = this.vocabulary.length - 1; // Quay lại cuối cùng khi ở đầu
    }
    this.flipped = false;
  }

  // Phương thức để lật flashcard
  flipCard() {
    this.flipped = !this.flipped;
  }

  // Phương thức để phát âm thanh phát âm từ vựng
  playPronunciation(word: string) {
    const audio = new Audio(`https://api.dictionaryapi.dev/media/pronunciations/en/${word}-us.mp3`);
    audio.play();
  }
}
