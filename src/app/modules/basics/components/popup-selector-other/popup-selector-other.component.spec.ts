import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectorOtherComponent } from './popup-selector-other.component';

describe('CustomerPopupSelectorOtherComponent', () => {
  let component: PopupSelectorOtherComponent;
  let fixture: ComponentFixture<PopupSelectorOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSelectorOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSelectorOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
