import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationInProgressComponent } from './negotiation-in-progress.component';

describe('NegotiationInProgressComponent', () => {
  let component: NegotiationInProgressComponent;
  let fixture: ComponentFixture<NegotiationInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiationInProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiationInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
