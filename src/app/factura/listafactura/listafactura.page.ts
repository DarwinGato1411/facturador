import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

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
    const mes = fecha.getMonth() + 1
    const anio = fecha.getFullYear()

    let diaF = "" + dia
    let mesF="" +mes 
    
    dia<10?diaF=`0${dia}`:''
    mes<10?mesF=`0${mes}`:''

    return `${anio}-${mesF}-${diaF}`
  }

  formatearFecha = (fechaInicio) => {
    const fecha = new Date(fechaInicio);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1
    const anio = fecha.getFullYear()

    let diaF = "" + dia
    let mesF="" +mes 
    
    dia<10?diaF=`0${dia}`:''
    mes<10?mesF=`0${mes}`:''
    
    return `${anio}-${mesF}-${diaF}`
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

    Swal.fire({
      icon: 'info',
      title: 'Buscando facturas',
      text: 'Por favor espere un momento',
      showConfirmButton: false,

    })

    this.cnx.buscarfacturas(descripcion, codTipoambiente, this.formatearFecha(this.fechaInicio.value), this.fechaFinal.value).subscribe(
      (ok: any) => {
        this.listafacturas = ok;
        Swal.close()
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
