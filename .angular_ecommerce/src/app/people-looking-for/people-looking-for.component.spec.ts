import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropleLookingForComponent } from './people-looking-for.component';

describe('PropleLookingForComponent', () => {
  let component: PropleLookingForComponent;
  let fixture: ComponentFixture<PropleLookingForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropleLookingForComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropleLookingForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
