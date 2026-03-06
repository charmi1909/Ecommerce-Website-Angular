import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicShareComponent } from './organic-share.component';

describe('OrganicShareComponent', () => {
  let component: OrganicShareComponent;
  let fixture: ComponentFixture<OrganicShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganicShareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganicShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
