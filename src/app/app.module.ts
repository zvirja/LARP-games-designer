import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatListModule, MatCheckboxModule, MatButtonModule, MatMenuModule, MatCommonModule, MatIconModule, MatDialogModule,
  MatFormFieldModule, MatSelectModule, MatInputModule, MatTableModule, MatSidenavModule
} from '@angular/material'
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { InventoryPanelComponent } from './inventory-panel/inventory-panel.component';
import { CreateNewEntityDialogComponent } from './dialogs/create-new-entity-dialog/create-new-entity-dialog.component';
import { EditEntityRelationsDialogComponent } from './dialogs/edit-entity-relations-dialog/edit-entity-relations-dialog.component';
import { EntityPickerComponent } from './bricks/entity-picker/entity-picker.component';
import { EntityInfoDialogComponent } from './dialogs/entity-info-dialog/entity-info-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { EntityNameComponent } from './bricks/entity-name/entity-name.component';
import { RelationsPanelComponent } from './relations-panel/relations-panel.component';
import { ItemsGroupComponent } from './bricks/items-group/items-group.component';
import { ActionIconComponent } from './bricks/action-icon/action-icon.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    QuillModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatCommonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSidenavModule
  ],
  declarations: [
    AppComponent,
    CanvasComponent,
    InventoryPanelComponent,
    CreateNewEntityDialogComponent,
    EditEntityRelationsDialogComponent,
    EntityPickerComponent,
    EntityInfoDialogComponent,
    ConfirmationDialogComponent,
    EntityNameComponent,
    RelationsPanelComponent,
    ItemsGroupComponent,
    ActionIconComponent,
  ],
  entryComponents: [CreateNewEntityDialogComponent, EditEntityRelationsDialogComponent, EntityInfoDialogComponent, ConfirmationDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
