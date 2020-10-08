import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecComponent } from './selec.component';

describe('SelecComponent', () => {
  let component: SelecComponent;
  let fixture: ComponentFixture<SelecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
