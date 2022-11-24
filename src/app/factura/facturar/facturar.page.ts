import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';



@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.page.html',
  styleUrls: ['./facturar.page.scss'],
})
export class FacturarPage implements OnInit {


  codTipoambiente;
  descripcion = "";
  clienteFacturar;
  clienteSelectedMostrar="S/N";
  active;

  listaproductos;
  

  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService) { 
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    console.log("this.codTipoambiente",this.codTipoambiente)
    
this.buscarproducto(this.descripcion, this.codTipoambiente)

  }

  ngOnInit() {
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





/*PRODUCTOS */
handleChangeProd(event) {
  const query = event.target.value.toUpperCase();
  this.buscarproducto(query, this.codTipoambiente)
  //this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  
}
/*OBTENEMOS LOS DATOS DEL API REST*/
async buscarproducto(descripcion, codTipoambiente) {

  /*const loading = await this.loadingController.create({
    message: 'Verificando',
  });
  loading.present();*/
  //

  this.cnx.buscarproductos(descripcion,codTipoambiente).subscribe(
    (ok: any) => {

      this.listaproductos = ok;
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
}
