import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-misservicios',
  templateUrl: './misservicios.page.html',
  styleUrls: ['./misservicios.page.scss'],
})
export class MisserviciosPage implements OnInit {


  listaServicios
  codTipoambiente
  listaproductos;
  descripcion = "";
  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService) {
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    console.log("this.codTipoambiente", this.codTipoambiente)
    this.buscarproducto(this.descripcion, this.codTipoambiente)

  }

  ngOnInit() {
    //  this.buscarservicios(this.descripcion, this.idUsuario)

  }


  public eliminarservicios(idOfertaServicio) {

    this.eliminarservicio(idOfertaServicio, this.codTipoambiente);

  }

  handleChangeProd(event) {
    const query = event.target.value;
    this.buscarproducto(query, this.codTipoambiente)
  }


  /*OBTENEMOS LOS DATOS DEL API REST*/
  async buscarproducto(descripcion, codTipoambiente) {

    Swal.fire({

      icon: 'success',
      title: 'Estamos cargando sus productos',
      showConfirmButton: false,

    })
    await this.cnx.buscarproductos(descripcion, codTipoambiente).subscribe(
      (ok: any) => {
        ok.forEach(element => {
          delete element.codTipoambiente
        });

        this.listaproductos = ok;
        console.log(this.listaproductos)
        Swal.close()
      },
      error => {
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
        this.buscarproducto(this.descripcion, this.codTipoambiente)
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
        this.buscarproducto(this.descripcion, this.codTipoambiente)
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
