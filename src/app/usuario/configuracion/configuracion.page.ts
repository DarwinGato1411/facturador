import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  ipServidor=new FormControl('');

  constructor() { }

  ngOnInit() {
    this.ipServidor.setValue(localStorage.getItem('ipservidor'))
  }

  guardarServidor(){
    localStorage.setItem('ipservidor',this.ipServidor.value)
  }



}
