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

  ipServidor=new FormControl('');

  constructor(private router: Router) { }

  ngOnInit() {
    this.ipServidor.setValue(localStorage.getItem('ipservidor'))
  }

  guardarServidor(){
    localStorage.setItem('ipservidor',this.ipServidor.value)
    Swal.fire({
      icon: 'success',
      title: 'Excelente!',
      text:'Servidor guardado con éxito',
      showConfirmButton: false,
      timer:2000,
    })
    this.router.navigateByUrl(`tabprincipal/login`);
  }



}
