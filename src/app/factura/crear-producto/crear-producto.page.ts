import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ConeccionapiService } from 'src/app/coneccionapi.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  fechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1
    const anio = fecha.getFullYear()
    return `${anio}-${mes}-${dia}`
  }


  producto = new FormGroup({
    prodCodigo: new FormControl(''),
    prodNombre: new FormControl(''),
    prodAbreviado: new FormControl('S/N'),
    pordCostoVentaRef: new FormControl(0),
    pordCostoVentaFinal: new FormControl(0),

    prodTrasnporte: new FormControl(0),
    prodIva: new FormControl(12),

    prodUtilidadNormal: new FormControl(35),
    prodManoObra: new FormControl(0),
    prodUtilidadPreferencial: new FormControl(0), //
    prodUtilidadDos: new FormControl(20),
    prodCostoPreferencial: new FormControl(25),//
    prodCostoPreferencialDos: new FormControl(0), //
    prodCostoPreferencialTres: new FormControl(0), //
    prodPrincipal: new FormControl(0),
    pordCostoCompra: new FormControl(0),//
    prodCantMinima: new FormControl(5),
    prodSubsidio: new FormControl(0),
    prodPrecioSinSubsidio: new FormControl(0),
    prodCantidadInicial: new FormControl(0),//

    prodGrabaIva: new FormControl(true),
    prodTieneSubsidio: new FormControl('N'),
    prodEsproducto: new FormControl(true),
    prodUnidadMedida: new FormControl('UNIDAD'),
    prodUnidadConversion: new FormControl('UNIDAD'),
    prodFactorConversion: new FormControl(1),
    prodFechaRegistro: new FormControl(this.fechaActual()),
    prodGrabaIce: new FormControl(false),
    prodPorcentajeIce: new FormControl(0)
  })

  constructor(private router: Router, private cnx: ConeccionapiService) { }

  ngOnInit() {
  }

  compraIVA() {
    console.log(this.producto.value)
    let { pordCostoVentaRef, prodIva, pordCostoCompra } = this.producto.controls
    let ivaCompra = pordCostoCompra.value * (1 + (prodIva.value / 100))
    console.log(pordCostoCompra.value, (1 + (prodIva.value / 100)))
    pordCostoVentaRef.setValue(ivaCompra)
  }

  crearProducto() {
    let codTipoambiente = localStorage.getItem("codTipoambiente")
    let producto = { ...this.producto.value, 
      codTipoambiente: { "codTipoambiente": codTipoambiente }
    }
    console.log(JSON.stringify( producto))
    this.cnx.crearProducto(producto)
  }


}
