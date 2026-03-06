import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOnSaleComponent } from './item-on-sale.component';

describe('ItemOnSaleComponent', () => {
  let component: ItemOnSaleComponent;
  let fixture: ComponentFixture<ItemOnSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemOnSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOnSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
