import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Device, DeviceService } from '../services/device.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  deviceList: Device[] = [];
  constructor(
    private deviceService: DeviceService,
    public alertController: AlertController,
    private userProvider: UserDataService
  ) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    this.deviceService.getDeviceList().subscribe(
      async (deviceList: Device[]) => {
        this.deviceList = this.filterList(deviceList);
        console.log('cartItems', this.deviceList);
      },
      async (error) => {
        let alert = await this.alertController.create({
          header: 'Error',
          message: 'An Error Occured',
          buttons: ['OK']
        });
        await alert.present();
      }
    );

  }

  filterList(deviceList: Device[]): Device[] {
    if (this.userProvider.cartItemList.length === 0 || deviceList.length === 0) {

      return [];
    }
    return deviceList.filter(e => this.userProvider.cartItemList.includes(e.id));
  }
  removeFromCart(id: string) {
    this.userProvider.removeFromCart(id);
    this.deviceList = [...this.deviceList.filter(e => e.id !== id)];
  }


}
