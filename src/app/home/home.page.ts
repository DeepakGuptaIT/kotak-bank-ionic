import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { DeviceService, Device } from '../services/device.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  deviceList: Device[] = [];
  loading: HTMLIonLoadingElement;
  constructor(
    private data: DataService,
    private deviceService: DeviceService,
    private loadingController: LoadingController,
    public alertController: AlertController) { }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
  async ionViewDidEnter() {

    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await this.loading.present();
    this.deviceService.getDeviceList().subscribe(
      async (deviceList: Device[]) => {
        this.deviceList = deviceList;
        console.log('deviceList', this.deviceList);
        await this.loading.dismiss();
      },
      async (error) => {
        let alert = await this.alertController.create({
          header: 'Error',
          message: 'An Error Occured',
          buttons: ['OK']
        });
        await alert.present();
        await this.loading.dismiss();
      }
    );

  }

}
