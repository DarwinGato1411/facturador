import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  crearProducto(){
    this.router.navigateByUrl(`crear-producto`);
  }
}
