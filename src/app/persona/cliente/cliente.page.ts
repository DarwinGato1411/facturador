import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  listaClientes;
  codTipoambiente;
  descripcion = "";

  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService,private router: Router) { 
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    console.log("this.codTipoambiente",this.codTipoambiente)
    this.buscarclientes(this.descripcion, this.codTipoambiente)

  }

  ngOnInit() {
  }


  handleChangeProd(event) {
  
    const query = event.target.value;
    this.buscarclientes(query, this.codTipoambiente)

  }

   /*OBTENEMOS LOS DATOS DEL API REST*/
   async buscarclientes(descripcion, codTipoambiente) {
    console.log('descripcion ',descripcion, codTipoambiente)
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

  crearCliente(){
    this.router.navigateByUrl(`crear-cliente`);
  }
}
