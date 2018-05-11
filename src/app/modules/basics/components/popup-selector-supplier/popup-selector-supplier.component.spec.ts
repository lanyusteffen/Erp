import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectorSupplierComponent } from './popup-selector-supplier.component';

describe('CustomerPopupSelectorSupplierComponent', () => {
  let component: PopupSelectorSupplierComponent;
  let fixture: ComponentFixture<PopupSelectorSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSelectorSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSelectorSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
