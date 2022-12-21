import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute} from '@angular/router';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  estado;
  fechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    let diaF=""+dia
    if(dia<10){
      diaF=`0${dia}`
    }
    const mes = fecha.getMonth() + 1
    const anio = fecha.getFullYear()
    return `${anio}-${mes}-${diaF}`
  }


  producto = new FormGroup({
    idProducto: new FormControl(),
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

  constructor(private router: Router,private route: ActivatedRoute, private cnx: ConeccionapiService,) { }

  ngOnInit() {
    this.estado = this.route.snapshot.paramMap.get('estado');
    if(this.estado==="Editar"){
      let {idProducto,
        prodEsproducto,
        prodGrabaIva,
        prodFechaRegistro,
        prodIva,
        prodCodigo,
        prodNombre,
        pordCostoCompra,
        pordCostoVentaRef,
        pordCostoVentaFinal}= JSON.parse(localStorage.getItem('productoEditar'))

        this.producto.controls.idProducto.setValue(idProducto)
        this.producto.controls.prodEsproducto.setValue(prodEsproducto)
        this.producto.controls.prodGrabaIva.setValue(prodGrabaIva)
        this.producto.controls.prodFechaRegistro.setValue(prodFechaRegistro)
        this.producto.controls.prodIva.setValue(prodIva)
        this.producto.controls.prodCodigo.setValue(prodCodigo)
        this.producto.controls.prodNombre.setValue(prodNombre)
        this.producto.controls.pordCostoCompra.setValue(pordCostoCompra)
        this.producto.controls.pordCostoVentaRef.setValue(pordCostoVentaRef)
        this.producto.controls.pordCostoVentaFinal.setValue(pordCostoVentaFinal)
        
    }

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
    let {prodCodigo,pordCostoVentaFinal,prodNombre} =this.producto.controls
    
      if(prodCodigo.value===""){
        Swal.fire({
          icon: 'warning',
          text: 'Por favor ingresar un código para el producto',
          timer: 3000
        })
      }else if(pordCostoVentaFinal.value===0){
        Swal.fire({
          icon: 'success',
          text: 'Por favor ingresar el pvp',
          timer: 3000
        })
      }else{
        let producto = { ...this.producto.value, 
          codTipoambiente: { "codTipoambiente": codTipoambiente },
          prodNombre:(this.producto.controls.prodNombre.value).toUpperCase()
        }
        console.log(JSON.stringify( producto))
        this.cnx.crearProducto(producto)
      }
  }

  capturarIVA(iva){
    let { prodIva } = this.producto.controls 
    if(iva==="true") {
      prodIva.setValue("12")
    }else{
      prodIva.setValue("0")
    }
  }


}
