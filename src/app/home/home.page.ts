import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from '../coneccionapi.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  busquedaSearch = '';
  listaProductos;

  lat;
  lon;


  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService,
    public geolocation: Geolocation,
    private camera: Camera) {
 //   this.buscar();
   // this.gps();
  }

  /*tomarFotografia() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log(err)
    });

  }

  gps() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lon = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  buscar() {
    console.log(this.busquedaSearch)


    console.log('Ejecuta')
    console.log(this.busquedaSearch)
    this.obtenerProductos(this.busquedaSearch);


  }
  prueba(buscar: any) {
    this.busquedaSearch = buscar.toUpperCase();

  }*/

  /*OBTENEMOS LOS DATOS DEL API REST*/
  async obtenerProductos(descripcion) {

    const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();
    //

    this.cnx.buscarproductos(descripcion,1).subscribe(
      (ok: any) => {

        this.listaProductos = ok;
        loading.dismiss();


        console.log(ok);
        //   this.router.navigateByUrl('tabprincipal');
      },
      error => {
        loading.dismiss();
        console.log(JSON.stringify(error));
        alert(JSON.stringify(error));
        this.presentAlert('Error de datos ....');
      }

    );

  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mi app',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
