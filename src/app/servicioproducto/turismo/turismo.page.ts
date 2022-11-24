import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';

@Component({
  selector: 'app-turismo',
  templateUrl: './turismo.page.html',
  styleUrls: ['./turismo.page.scss'],
})
export class TurismoPage implements OnInit {


  busquedaSearch = '';
  listaTurismo;


  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService,
    private router:Router) { 

     // this.buscar();
    }

  ngOnInit() {
  }

  buscar() {
    console.log(this.busquedaSearch)


    console.log('Ejecuta')
    console.log(this.busquedaSearch)
    this.buscarturismo(this.busquedaSearch);


  }
  upperCase(buscar: any) {
    this.busquedaSearch = buscar.toUpperCase();

  }

  /*OBTENEMOS LOS DATOS DEL API REST*/
  async buscarturismo(descripcion) {

    const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();
    //

    this.cnx.turismoall(descripcion).subscribe(
      (ok: any) => {
       
        this.listaTurismo = ok;
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
  tourvirtual(valor){
    console.log(" HTTTP  ",valor);
    localStorage.setItem("tourvirtual", valor);
    this.router.navigateByUrl('tourvirtual');
   // this.correo = this.activatedroute.snapshot.paramMap.get("correo");
  }

  vermapa(latitud, longitud){
    console.log(" longitud  ",longitud);
    console.log(" latitud  ",latitud);
    localStorage.setItem("latmapa", latitud);
    localStorage.setItem("longmapa", longitud);
    this.router.navigateByUrl('mapa');

  }

}
