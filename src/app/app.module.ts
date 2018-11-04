import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatCheckboxModule, MatButtonModule, MatMenuModule, MatCommonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { EntitiesGroupComponent } from './palette/entities-group/entities-group.component';
import { InventoryComponent } from './palette/inventory/inventory.component';
import { CreateNewEntityDialogComponent } from './palette/create-new-entity-dialog/create-new-entity-dialog.component';
import { EditEntityRelationsDialogComponent } from './palette/edit-entity-relations-dialog/edit-entity-relations-dialog.component';
import { EntityPickerComponent } from './palette/entity-picker/entity-picker.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
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
  ],
  entryComponents: [CreateNewEntityDialogComponent, EditEntityRelationsDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
