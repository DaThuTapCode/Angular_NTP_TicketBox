import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterManagerComponent } from './theater-manager.component';

describe('TheaterManagerComponent', () => {
  let component: TheaterManagerComponent;
  let fixture: ComponentFixture<TheaterManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
