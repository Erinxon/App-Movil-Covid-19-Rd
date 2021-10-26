import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvinciasPageRoutingModule } from './provincias-routing.module';

import { ProvinciasPage } from './provincias.page';
import { LoandingComponent } from '../shared/loanding/loanding.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvinciasPageRoutingModule
  ],
  declarations: [ProvinciasPage, LoandingComponent]
})
export class ProvinciasPageModule {}
