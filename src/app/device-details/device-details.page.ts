import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Device, DeviceService } from '../services/device.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage implements OnInit {
  public device: Device;
  loading: HTMLIonLoadingElement;
  constructor(
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
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

}
