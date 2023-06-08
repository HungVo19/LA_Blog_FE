import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogManageAreaComponent } from './blog-manage-area.component';

describe('BlogManageAreaComponent', () => {
  let component: BlogManageAreaComponent;
  let fixture: ComponentFixture<BlogManageAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogManageAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogManageAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
