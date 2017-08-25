import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Camera , Base64ToGallery]
})
export class HomePage {

  imageData:any;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private base64ToGallery: Base64ToGallery
  ) {}

  takeAndSavePic() {
    const options: CameraOptions = {
      quality: 20,
      targetWidth:300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Data = 'data:image/jpeg;base64,' + imageData;
     this.base64ToGallery.base64ToGallery(base64Data, { prefix: '_img' }).then(
      res => console.log('Saved image to gallery ', res),
      err => console.log('Error saving image to gallery ', err)
    );
    }, (err) => {
     // Handle error
    });

    // const options: CameraOptions = {
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   quality: 10,
    //   targetWidth:300
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   this.imageData = imageData;
    // }, (err) => {});
  }

}
