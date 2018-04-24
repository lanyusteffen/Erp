import { Component, Input, OnInit } from '@angular/core';
import { ContactsPopupSelectorService } from './contacts-popup-selector.service';

@Component({
  selector: 'app-contacts-popup-selector',
  templateUrl: './contacts-popup-selector.component.html',
  styleUrls: ['./contacts-popup-selector.component.less'],
  providers: [ContactsPopupSelectorService]
})

export class ContactsPopupSelectorComponent implements OnInit {
  private show = false;

  constructor(
    private contactsPopupSelectorService: ContactsPopupSelectorService
  ) { }

  ngOnInit() { }

  showModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

}
