import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { EntitiesGroupComponent } from './palette/entities-group/entities-group.component';
import { InventoryComponent } from './palette/inventory/inventory.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CanvasComponent,
    EntitiesGroupComponent,
    InventoryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
