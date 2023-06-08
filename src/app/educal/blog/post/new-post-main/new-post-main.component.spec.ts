import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostMainComponent } from './new-post-main.component';

describe('NewPostMainComponent', () => {
  let component: NewPostMainComponent;
  let fixture: ComponentFixture<NewPostMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
