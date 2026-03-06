import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurrecentBlogsComponent } from './ourrecent-blogs.component';

describe('OurrecentBlogsComponent', () => {
  let component: OurrecentBlogsComponent;
  let fixture: ComponentFixture<OurrecentBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurrecentBlogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurrecentBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
