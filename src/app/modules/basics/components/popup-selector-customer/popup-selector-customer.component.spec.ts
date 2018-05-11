import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectorCustomerComponent } from './popup-selector-customer.component';

describe('PopupSelectorCustomerComponent', () => {
  let component: PopupSelectorCustomerComponent;
  let fixture: ComponentFixture<PopupSelectorCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSelectorCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSelectorCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
