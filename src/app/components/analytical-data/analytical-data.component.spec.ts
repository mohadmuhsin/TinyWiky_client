import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalDataComponent } from './analytical-data.component';

describe('AnalyticalDataComponent', () => {
  let component: AnalyticalDataComponent;
  let fixture: ComponentFixture<AnalyticalDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticalDataComponent]
    });
    fixture = TestBed.createComponent(AnalyticalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
