import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyPracticeComponent } from './vocabulary-practice.component';

describe('VocabularyPracticeComponent', () => {
  let component: VocabularyPracticeComponent;
  let fixture: ComponentFixture<VocabularyPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabularyPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
