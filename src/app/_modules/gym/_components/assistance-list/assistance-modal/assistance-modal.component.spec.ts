import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceModalComponent } from './assistance-modal.component';

describe('AssistanceModalComponent', () => {
  let component: AssistanceModalComponent;
  let fixture: ComponentFixture<AssistanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
