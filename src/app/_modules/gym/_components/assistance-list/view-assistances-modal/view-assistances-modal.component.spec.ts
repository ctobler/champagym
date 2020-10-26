import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssistancesModalComponent } from './view-assistances-modal.component';

describe('ViewAssistancesModalComponent', () => {
  let component: ViewAssistancesModalComponent;
  let fixture: ComponentFixture<ViewAssistancesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssistancesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssistancesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
