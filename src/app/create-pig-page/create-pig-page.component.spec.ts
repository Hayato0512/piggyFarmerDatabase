import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePigPageComponent } from './create-pig-page.component';

describe('CreatePigPageComponent', () => {
  let component: CreatePigPageComponent;
  let fixture: ComponentFixture<CreatePigPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePigPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
