import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntidadPage } from './entidad.page';

const routes: Routes = [
  {
    path: '',
    component: EntidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntidadPageRoutingModule {}
