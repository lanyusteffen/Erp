import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectorGoodsComponent } from './popup-selector-goods.component';

describe('PopupSelectorGoodsComponent', () => {
  let component: PopupSelectorGoodsComponent;
  let fixture: ComponentFixture<PopupSelectorGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSelectorGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSelectorGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
