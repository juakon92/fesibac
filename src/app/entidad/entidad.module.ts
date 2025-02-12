import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadPageRoutingModule } from './entidad-routing.module';

import { EntidadPage } from './entidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadPageRoutingModule
  ],
  declarations: [EntidadPage]
})
export class EntidadPageModule {}
