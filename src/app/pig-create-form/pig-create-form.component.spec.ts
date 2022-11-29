import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigCreateFormComponent } from './pig-create-form.component';

describe('PigCreateFormComponent', () => {
  let component: PigCreateFormComponent;
  let fixture: ComponentFixture<PigCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PigCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
