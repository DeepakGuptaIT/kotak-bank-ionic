import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DeviceListComponent } from './device-list.component';



@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [DeviceListComponent],
  exports: [DeviceListComponent]
})
export class DeviceListComponentModule { }
