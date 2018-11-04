import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatCheckboxModule, MatButtonModule, MatMenuModule, MatCommonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material'
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { EntitiesGroupComponent } from './palette/entities-group/entities-group.component';
import { InventoryComponent } from './palette/inventory/inventory.component';
import { CreateNewEntityDialogComponent } from './palette/dialogs/create-new-entity-dialog/create-new-entity-dialog.component';
import { EditEntityRelationsDialogComponent } from './palette/dialogs/edit-entity-relations-dialog/edit-entity-relations-dialog.component';
import { EntityPickerComponent } from './palette/entity-picker/entity-picker.component';
import { EntityInfoDialogComponent } from './palette/dialogs/entity-info-dialog/entity-info-dialog.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
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
    MatSelectModule
  ],
  declarations: [
    AppComponent,
    CanvasComponent,
    EntitiesGroupComponent,
    InventoryComponent,
    CreateNewEntityDialogComponent,
    EditEntityRelationsDialogComponent,
    EntityPickerComponent,
    EntityInfoDialogComponent,
  ],
  entryComponents: [CreateNewEntityDialogComponent, EditEntityRelationsDialogComponent, EntityInfoDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
