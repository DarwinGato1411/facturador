import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConeccionapiService } from 'src/app/coneccionapi.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {

  fechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1
    const anio = fecha.getFullYear()
    console.log(`${dia}-${mes}-${anio}`)

    return `${anio}-${mes}-${dia}`
  }

  cliente = new FormGroup({
    idTipoIdentificacion: new FormControl(1),
    cliCedula: new FormControl(''),
    ciudad: new FormControl(''),
    cliNombre: new FormControl(''),
    // cliApellido: new FormControl(''),
    clieFechaRegistro: new FormControl(this.fechaActual()),
    cliTelefono: new FormControl(''),
    cliMovil: new FormControl(''),
    cliDireccion: new FormControl(''),
    cliCorreo: new FormControl(''),
    clietipo: new FormControl(0),
  })
  constructor(private cnx: ConeccionapiService, private router: Router) { }

  ngOnInit() {
  }

  guardarDatos() {
    let codTipoambiente = localStorage.getItem("codTipoambiente")
    let cliente = {
      ...this.cliente.value,
      cliNombre: (this.cliente.controls.cliNombre.value).toUpperCase(),
      cliRazonSocial: (this.cliente.controls.cliNombre.value).toUpperCase(),
      codTipoambiente: { "codTipoambiente": codTipoambiente },
      idTipoIdentificacion: {
        idTipoIdentificacion: this.cliente.controls.idTipoIdentificacion.value,
      },
    }
   
    this.cnx.crearCliente(cliente)

    
  }
}
