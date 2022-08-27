import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruaComponent } from './grua.component';

describe('GruaComponent', () => {
  let component: GruaComponent;
  let fixture: ComponentFixture<GruaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
