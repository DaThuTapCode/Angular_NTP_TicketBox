import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeManagerComponent } from './showtime-manager.component';

describe('ShowtimeManagerComponent', () => {
  let component: ShowtimeManagerComponent;
  let fixture: ComponentFixture<ShowtimeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimeManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowtimeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
