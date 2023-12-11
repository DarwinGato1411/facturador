import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  ipServidor = new FormControl('207.180.205.121');
  puerto = new FormControl('9088');
  tipoconexion = new FormControl('http');

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('ipservidor') && localStorage.getItem('ipservidor') && localStorage.getItem('tipoconexion')) {
      console.log("variables localstorage")
      this.ipServidor.setValue(localStorage.getItem('ipservidor'))
      this.puerto.setValue(localStorage.getItem('puerto'))
      this.tipoconexion.setValue(localStorage.getItem('tipoconexion'))
    }
  }

  guardarServidor() {
    localStorage.setItem('ipservidor', this.ipServidor.value)
    localStorage.setItem('puerto', this.puerto.value)
    localStorage.setItem('tipoconexion', this.tipoconexion.value)
    Swal.fire({
      icon: 'success',
      title: 'Excelente!',
      text: 'Servidor guardado con éxito',
      showConfirmButton: false,
      timer: 2000,
    })
    this.router.navigateByUrl(`tabprincipal/login`);
  }



}
