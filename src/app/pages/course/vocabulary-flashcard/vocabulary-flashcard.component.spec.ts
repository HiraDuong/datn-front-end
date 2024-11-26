import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyFlashcardComponent } from './vocabulary-flashcard.component';

describe('VocabularyFlashcardComponent', () => {
  let component: VocabularyFlashcardComponent;
  let fixture: ComponentFixture<VocabularyFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyFlashcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabularyFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
