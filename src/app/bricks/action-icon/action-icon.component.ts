import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-icon',
  templateUrl: './action-icon.component.html',
  styleUrls: ['./action-icon.component.scss'],
})
export class ActionIconComponent {
  @Input() tooltip = ''
  @Output() readonly action = new EventEmitter();
}
