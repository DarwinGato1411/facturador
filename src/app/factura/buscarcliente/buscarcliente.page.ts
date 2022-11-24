import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';

@Component({
  selector: 'app-buscarcliente',
  templateUrl: './buscarcliente.page.html',
  styleUrls: ['./buscarcliente.page.scss'],
})
export class BuscarclientePage implements OnInit {

 
  busquedaSearch = '';
  codTipoambiente;
  listaProductos;

  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService) {
    
      this.buscar();
      

      

  }

  ngOnInit() {
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    console.log("this.codTipoambiente",this.codTipoambiente)
  }

  buscar() {
    console.log(this.busquedaSearch)


    console.log('Ejecuta')
    console.log(this.busquedaSearch)
    this.obtenerProductos(this.busquedaSearch,this.codTipoambiente);


  }
  upperCase(buscar: any) {
    this.busquedaSearch = buscar.toUpperCase();

  }

  /*OBTENEMOS LOS DATOS DEL API REST*/
  async obtenerProductos(descripcion,codTipoambiente) {

    const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();
    //

    this.cnx.buscarproductos(descripcion,codTipoambiente).subscribe(
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
