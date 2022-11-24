import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';

@Component({
  selector: 'app-misservicios',
  templateUrl: './misservicios.page.html',
  styleUrls: ['./misservicios.page.scss'],
})
export class MisserviciosPage implements OnInit {


  listaServicios
  codTipoambiente

  descripcion = "";
  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService) {
      this.codTipoambiente = localStorage.getItem("codTipoambiente");
    console.log("this.codTipoambiente",this.codTipoambiente)
    this.buscarservicios(this.descripcion, this.codTipoambiente)

  }

  ngOnInit() {
  //  this.buscarservicios(this.descripcion, this.idUsuario)

  }


  public eliminarservicios(idOfertaServicio) {

    this.eliminarservicio(idOfertaServicio, this.codTipoambiente);
    
  }
  /*OBTENEMOS LOS DATOS DEL API REST*/
  async buscarservicios(descripcion, codTipoambiente) {

    /*const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();*/
    //

    this.cnx.buscarproductos(descripcion,codTipoambiente).subscribe(
      (ok: any) => {

        this.listaServicios = ok;
      //  loading.dismiss();


        console.log(ok);
        //   this.router.navigateByUrl('tabprincipal');
      },
      error => {
       // loading.dismiss();
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



  /*OBTENEMOS LOS DATOS DEL API REST*/
  async eliminarservicio(idOfertaServicio, idUsuario) {

    const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();
    //

    this.cnx.eliminarservicio(idOfertaServicio, idUsuario).subscribe(
      (ok: any) => {
        this.buscarservicios(this.descripcion, this.codTipoambiente)
      //  this.listaServicios = ok;
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

   /*OBTENEMOS LOS DATOS DEL API REST*/
   async modificar(idProducto) {

    const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();
    //

    this.cnx.eliminarservicio(idProducto, idProducto).subscribe(
      (ok: any) => {
        this.buscarservicios(this.descripcion, this.codTipoambiente)
      //  this.listaServicios = ok;
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

}
