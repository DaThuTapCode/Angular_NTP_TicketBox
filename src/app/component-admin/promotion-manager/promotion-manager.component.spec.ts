import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionManagerComponent } from './promotion-manager.component';

describe('PromotionManagerComponent', () => {
  let component: PromotionManagerComponent;
  let fixture: ComponentFixture<PromotionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
