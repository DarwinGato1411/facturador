import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listafactura',
  templateUrl: './listafactura.page.html',
  styleUrls: ['./listafactura.page.scss'],
})
export class ListafacturaPage implements OnInit {

  listafacturas;
  codTipoambiente;
  descripcion = "";

  fechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    let diaF = "" + dia
    if (dia < 10) {
      diaF = `0${dia}`
    }
    const mes = fecha.getMonth() + 1
    const anio = fecha.getFullYear()
    return `${anio}-${mes}-${diaF}`
  }

  formatearFecha = (fechaInicio) => {
    const fecha = new Date(fechaInicio);
    const dia = fecha.getDate();
    let diaF = "" + dia
    if (dia < 10) {
      diaF = `0${dia}`
    }
    const mes = fecha.getMonth() + 1
    const anio = fecha.getFullYear()
    return `${anio}-${mes}-${diaF}`
  }

  fechaInicio = new FormControl(this.fechaActual())
  fechaFinal = new FormControl(this.fechaActual())

  constructor(public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService) {
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    this.buscarfacturas(this.descripcion, this.codTipoambiente)

  }

  ngOnInit() {
  }


  /*OBTENEMOS LOS DATOS DEL API REST*/
  async buscarfacturas(descripcion, codTipoambiente) {


    this.cnx.buscarfacturas(descripcion, codTipoambiente, this.formatearFecha(this.fechaInicio.value), this.fechaFinal.value).subscribe(
      (ok: any) => {

        this.listafacturas = ok;
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


  buscarFacturaPorFecha() {
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    this.buscarfacturas(this.descripcion, this.codTipoambiente)
  }

  autorizarFactura(factu){
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    
    let facturaAu={
      tipoambiente:this.codTipoambiente,
      numero:factu.facNumeroText
    }
    console.log(facturaAu)
     this.cnx.facturaAutorizar(facturaAu)
  }


}
