import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';

@Component({
  selector: 'app-listafactura',
  templateUrl: './listafactura.page.html',
  styleUrls: ['./listafactura.page.scss'],
})
export class ListafacturaPage implements OnInit {

  listafacturas;
  codTipoambiente;
  descripcion = "";

  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService) { 
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    console.log("this.codTipoambiente",this.codTipoambiente)
    this.buscarfacturas(this.descripcion, this.codTipoambiente)

  }

  ngOnInit() {
  }


/*OBTENEMOS LOS DATOS DEL API REST*/
async buscarfacturas(descripcion, codTipoambiente) {

  /*const loading = await this.loadingController.create({
    message: 'Verificando',
  });
  loading.present();*/
  //

  this.cnx.buscarfacturas(descripcion,codTipoambiente).subscribe(
    (ok: any) => {

      this.listafacturas = ok;
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



}
