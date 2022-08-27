import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolquetaComponent } from './volqueta.component';

describe('VolquetaComponent', () => {
  let component: VolquetaComponent;
  let fixture: ComponentFixture<VolquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolquetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
