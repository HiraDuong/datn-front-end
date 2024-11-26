import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarLessonComponent } from './grammar-lesson.component';

describe('GrammarLessonComponent', () => {
  let component: GrammarLessonComponent;
  let fixture: ComponentFixture<GrammarLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrammarLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrammarLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
