import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../../services/lesson/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateLessonDTO } from '../../../../types/dtos/lesson.dto';
import { VocabularyService } from '../../../../services/vocabulary/vocabulary.service';
import { GrammarService } from '../../../../services/grammar/grammar.service';
import { ListVocabularyDTO } from '../../../../types/dtos/vocabulary.dto';
import { ListGrammarDTO } from '../../../../types/dtos/grammar.dto';
import { ListTaskDTO } from '../../../../types/dtos/task.dto';


@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css'],
})
export class LessonCreateComponent implements OnInit {
  courseId!: number;
  lessonForm!: FormGroup;
  vocabularies: ListVocabularyDTO[] = [];
  grammars: ListGrammarDTO[] = [];
  tasks: ListTaskDTO[] = [];
  currentVocabularyPage: number = 1;
  currentGrammarPage: number = 1;
  vocabularyPageSize: number = 5;
  grammarPageSize: number = 5;
  totalVocabularies: number = 0;
  totalGrammars: number = 0;
  showVocabulary = false;
  showGrammar = false;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly rt: Router,
    private readonly lessonService: LessonService,
    private readonly vocabularyService: VocabularyService,
    private readonly grammarService: GrammarService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.lessonForm = this.fb.group({
      name: [''],
      description: [''],
      duration: [0],
      number: [0],
      courseId: [this.courseId],
      vocabularies: [],
      grammars: [],
      tasks: [],
    });
    this.listVocabulary(this.currentVocabularyPage, this.vocabularyPageSize);
    this.listGrammar(this.currentGrammarPage, this.grammarPageSize);
  }

  listVocabulary(page: number, size: number): void {
    this.vocabularyService.listVocabulary(size, page).subscribe({
      next: (response) => {
        console.log(response);
        this.vocabularies = response.data;
        this.totalVocabularies = response.totalRecords ?? 0;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  listGrammar(page: number, size: number): void {
    this.grammarService.listGrammar(size, page).subscribe({
      next: (response) => {
        console.log(response);
        this.grammars = response.data;
        this.totalGrammars = response.totalRecords ?? 0;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addVocabulary(vocabularyId: number): void {
    const currentVocabularies = this.lessonForm.get('vocabularies')?.value || [];
    if (!currentVocabularies.includes(vocabularyId)) {
      currentVocabularies.push(vocabularyId);
      this.lessonForm.patchValue({ vocabularies: currentVocabularies });
    }
  }

  addGrammar(grammarId: number): void {
    const currentGrammars = this.lessonForm.get('grammars')?.value || [];
    if (!currentGrammars.includes(grammarId)) {
      currentGrammars.push(grammarId);
      this.lessonForm.patchValue({ grammars: currentGrammars });
    }
  }

  createLesson(): void {
    const lesson: CreateLessonDTO = this.lessonForm.value;
    this.lessonService.createLesson(lesson).subscribe({
      next: (response) => {
        console.log(response);
        this.rt.navigate(['/admin/course',this.courseId]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  toggleVocabulary() {
    this.showVocabulary = !this.showVocabulary;
  }

  toggleGrammar() {
    this.showGrammar = !this.showGrammar;
  }
  previousVocabularyPage(): void {
    if (this.currentVocabularyPage > 1) {
      this.currentVocabularyPage--;
      this.listVocabulary(this.currentVocabularyPage, this.vocabularyPageSize);
    }
  }

  nextVocabularyPage(): void {
    if (this.currentVocabularyPage * this.vocabularyPageSize < this.totalVocabularies) {
      this.currentVocabularyPage++;
      this.listVocabulary(this.currentVocabularyPage, this.vocabularyPageSize);
    }
  }

  previousGrammarPage(): void {
    if (this.currentGrammarPage > 1) {
      this.currentGrammarPage--;
      this.listGrammar(this.currentGrammarPage, this.grammarPageSize);
    }
  }

  nextGrammarPage(): void {
    if (this.currentGrammarPage * this.grammarPageSize < this.totalGrammars) {
      this.currentGrammarPage++;
      this.listGrammar(this.currentGrammarPage, this.grammarPageSize);
    }
  }
}
