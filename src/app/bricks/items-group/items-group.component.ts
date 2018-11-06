import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-items-group',
  templateUrl: './items-group.component.html',
  styleUrls: ['./items-group.component.scss']
})
export class ItemsGroupComponent {
  @Input() title = '';
  @Input() items: any[] = [];

  @ContentChild(TemplateRef) entryTemplate: TemplateRef<any>;
}
