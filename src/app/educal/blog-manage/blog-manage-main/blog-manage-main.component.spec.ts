import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogManageMainComponent } from './blog-manage-main.component';

describe('BlogManageMainComponent', () => {
  let component: BlogManageMainComponent;
  let fixture: ComponentFixture<BlogManageMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogManageMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogManageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
