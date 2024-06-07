import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenManagerComponent } from './screen-manager.component';

describe('ScreenManagerComponent', () => {
  let component: ScreenManagerComponent;
  let fixture: ComponentFixture<ScreenManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreenManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
