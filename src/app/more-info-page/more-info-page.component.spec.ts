import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoPageComponent } from './more-info-page.component';

describe('MoreInfoPageComponent', () => {
  let component: MoreInfoPageComponent;
  let fixture: ComponentFixture<MoreInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
