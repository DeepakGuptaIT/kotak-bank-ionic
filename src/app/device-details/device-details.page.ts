import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Device, DeviceService } from '../services/device.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage implements OnInit {
  public device: Device;
  loading: HTMLIonLoadingElement;
  isAdded = false;
  constructor(
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private userProvider: UserDataService,
    public router: Router,
    private toastCtrl: ToastController,

  ) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.isAdded = this.userProvider.hasAddedToCart(id);
    await this.loading.present();
    this.deviceService.getDeviceList().subscribe(
      async (deviceList: Device[]) => {
        if (deviceList) {
          this.device = deviceList.filter(e => e.id === id)[0];
          console.log('device', this.device);
        }
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
  playVideo(videoUrl: string) {
    // Playing a video.
    // this.videoPlayer.play(videoUrl).then(() => {
    //   console.log('video completed');
    // }).catch(err => {
    //   console.log(err);
    // });
  }
  async toggleCart() {
    if (this.userProvider.hasAddedToCart(this.device.id)) {
      this.userProvider.removeFromCart(this.device.id);
      this.isAdded = false;
      const toast = await this.toastCtrl.create({
        message: `Item removed from cart`,
        duration: 2000,
      });
      await toast.present();
    } else {
      this.userProvider.addToCart(this.device.id);
      this.isAdded = true;
      const toast = await this.toastCtrl.create({
        message: `Item added to cart`,
        duration: 2000,
      });
      await toast.present();

    }
  }
  gotoCart() {
    this.router.navigateByUrl('/cart', { replaceUrl: true })
  }

}
