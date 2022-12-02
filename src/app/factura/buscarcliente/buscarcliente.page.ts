import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';

@Component({
  selector: 'app-buscarcliente',
  templateUrl: './buscarcliente.page.html',
  styleUrls: ['./buscarcliente.page.scss'],
})
export class BuscarclientePage implements OnInit {
  listaClientes;
  codTipoambiente;
  descripcion = "";

  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService,
    private router: Router) { 
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    console.log("this.codTipoambiente",this.codTipoambiente)
    this.buscarclientes(this.descripcion, this.codTipoambiente)
  }

  ngOnInit() {
  }

   /*OBTENEMOS LOS DATOS DEL API REST*/
   async buscarclientes(descripcion, codTipoambiente) {

    /*const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();*/
    //

    this.cnx.buscarclientes(descripcion,codTipoambiente).subscribe(
      (ok: any) => {

        this.listaClientes = ok;
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

   crearFactura(usu){
    localStorage.setItem("usuario",JSON.stringify(usu))
   
    this.router.navigateByUrl(`facturar/qwe`);
  }

}
