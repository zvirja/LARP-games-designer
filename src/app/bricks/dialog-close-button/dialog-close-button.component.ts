import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-close-button',
  templateUrl: './dialog-close-button.component.html',
  styleUrls: ['./dialog-close-button.component.scss']
})
export class DialogCloseButtonComponent {
  @Output() readonly close = new EventEmitter()
}
