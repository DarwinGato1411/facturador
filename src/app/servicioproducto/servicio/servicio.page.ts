import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';





@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {

  busquedaSearch = '';
  listaProductos;
  link: string='https://link.medium.com/JA4amAHFJ5'
  imgurl:string= 'https://cdn.pixabay.com/photo/2019/12/26/05/10/pink-4719682_960_720.jpg'

  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService
   ) {

    this.buscar();
  //  alert("entra....")
  }


  ngOnInit() {
  }
 
  
  buscar() {
    console.log(this.busquedaSearch)


    console.log('Ejecuta')
    console.log(this.busquedaSearch)
    this.buscarservicios(this.busquedaSearch);


  }
  upperCase(buscar: any) {
    this.busquedaSearch = buscar.toUpperCase();

  }

  /*OBTENEMOS LOS DATOS DEL API REST*/
  async buscarservicios(descripcion) {

    const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();
    //

    this.cnx.buscarservicios(descripcion).subscribe(
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
