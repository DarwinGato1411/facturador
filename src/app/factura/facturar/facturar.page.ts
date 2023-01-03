import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import { ActivatedRoute } from '@angular/router'
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { element } from 'protractor';
import { parse } from 'path';

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.page.html',
  styleUrls: ['./facturar.page.scss'],
})
export class FacturarPage implements OnInit {

  descripcion = "";

  total = 0;
  iva = 0;
  desc = 0;
  totalPorProducto = 0;

  listaproductos;
  carritoProducto = [];

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
  //construccion json factura
  usuario: any;
  codTipoambiente;
  factIva = 0;
  facSubtotal = 0;

  constructor(
    public alertController: AlertController,
    private loadingController: LoadingController,
    private cnx: ConeccionapiService,
    private activatedRouter: ActivatedRoute
  ) {
    this.codTipoambiente = localStorage.getItem("codTipoambiente");
    this.buscarproducto(this.descripcion, this.codTipoambiente);
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    console.log(this.usuario)

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

  handleChangeProd(event) {
    const query = event.target.value.toUpperCase()
    this.buscarproducto(query, this.codTipoambiente)
  }

  /*OBTENEMOS LOS DATOS DEL API REST*/
  async buscarproducto(descripcion, codTipoambiente) {

    Swal.fire({

      icon: 'success',
      title: 'Estamos buscando sus productos',
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
  calcularFactIva(prodIva, precioFinalPorProducto, cantidadComprada, descuento) {

    let descuentoCalc = 0;
    if (descuento > 0 && descuento < precioFinalPorProducto) {
      descuentoCalc = precioFinalPorProducto - descuento;
    }

    this.facSubtotal = 0
    let precioFinal = precioFinalPorProducto - descuentoCalc;
    let indiceVariacion = 1 + (prodIva / 100)
    let precioInicial = precioFinal / indiceVariacion
    this.facSubtotal = precioInicial * cantidadComprada
    this.factIva = ((precioInicial * (prodIva / 100)) * cantidadComprada);

  }


  agregarCarrito(item) {


    let itemCamposNuevos = { ...item, detCantidad: 1, totalPagarPorProducto: 1 * item.pordCostoVentaFinal, precioNuevo: item.pordCostoVentaFinal, factIva: 0 }

    if (this.carritoProducto.find(prod => prod.idProducto === item.idProducto)) {
      this.carritoProducto.map(prod => {
        if (prod.idProducto == item.idProducto) {
          prod.detCantidad = parseInt(prod.detCantidad) + 1;
          prod.totalPagarPorProducto = prod.detCantidad * prod.precioNuevo
          this.calcularProducto(prod)
        }
      })
    } else {
      itemCamposNuevos.totalPagarPorProducto = itemCamposNuevos.detCantidad * itemCamposNuevos.precioNuevo
      console.log(itemCamposNuevos.totalPagarPorProducto, "=", itemCamposNuevos.detCantidad, itemCamposNuevos.precioNuevo)
      console.log(itemCamposNuevos);
      this.calcularProducto(itemCamposNuevos)
      this.carritoProducto.push(itemCamposNuevos)
    }

    this.calcularTotal()
  }

  calcularTotal() {
    this.total = 0;
    this.iva = 0;
    this.desc = 0;
    this.carritoProducto.forEach(producto => {
      this.total = Number((this.total + producto.totalPagarPorProducto).toFixed(2))
      this.iva = Number((this.iva + producto.detIva).toFixed(2))
      this.desc = Number((this.desc + ((producto.pordCostoVentaFinal - producto.detTotal) * producto.detCantidad)).toFixed(2))
    });
  }

  eliminarProducto(item) {
    this.carritoProducto = this.carritoProducto.filter((producto) => producto.idProducto !== item.idProducto)
    this.calcularTotal();
  }

  totalProductoCalcularCantidad(cantidadProductoComprar, item) {
    item.totalPagarPorProducto = cantidadProductoComprar * item.precioNuevo
    item.detCantidad = parseInt(cantidadProductoComprar)
    this.calcularProducto(item)
  }

  totalProductoCalcularPrecio(precioVentaNuevo, item) {
    if(item.prodEsproducto){
      if (precioVentaNuevo <= item.pordCostoVentaFinal) {
        item.precioNuevo = precioVentaNuevo
        item.totalPagarPorProducto = item.detCantidad * item.precioNuevo
        this.calcularProducto(item)
      } else {
        precioVentaNuevo = item.pordCostoVentaFinal
        item.precioNuevo = item.pordCostoVentaFinal
        item.totalPagarPorProducto = item.pordCostoVentaFinal * item.precioNuevo
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El precio ingresado no debe superar al precio del producto',
  
        })
      }
    }else{
      item.precioNuevo = precioVentaNuevo
      item.totalPagarPorProducto = item.detCantidad * item.precioNuevo
      this.calcularProducto(item)
    }

    
    this.calcularTotal()
  }

  calcularProducto(item) {
    this.factIva = 0;
    this.facSubtotal = 0;

    this.calcularFactIva(item.prodIva, item.pordCostoVentaFinal, item.detCantidad, item.precioNuevo)
    item.detIva = this.factIva
    item.detSubtotaldescuentoporcantidad = this.facSubtotal;
    item.detSubtotal = item.pordCostoVentaFinal / (1 + (item.prodIva / 100))
    item.detSubtotaldescuento = item.precioNuevo / (1 + ((item.prodIva / 100)))
    item.detSubtotaldescuentoporcantidad = this.facSubtotal;
    
    item.detTotal = parseFloat(item.precioNuevo)

    item.totalPagarPoritemucto = item.detCantidad * item.precioNuevo
    item.detTotalconiva = item.totalPagarPoritemucto
    item.detTotaldescuentoiva = item.totalPagarPorProducto

    if(item.prodEsproducto){
      item.detValdescuento = (item.detSubtotal - item.detSubtotaldescuento)
      item.detCantpordescuento = item.detCantidad * item.detValdescuento
    }else{
      item.detValdescuento =0
      item.detCantpordescuento=0
    }
   
    

    item.detTotaldescuento = item.detValdescuento * item.detCantidad

    item.detTarifa = item.prodIva
    item.prodGrabaIva ? item.detCodPorcentaje = 2 : item.detCodPorcentaje = 0




    if (item.precioVentaNuevo > 0 && item.precioVentaNuevo < item.pordCostoVentaFinal) {
      item.detPordescuento = item.pordCostoVentaFinal;
    }

    this.calcularTotal()
    console.log(item)
  }

  formatearFecha(fecha, formato) {
    const map = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yy: fecha.getFullYear().toString().slice(-2),
      yyyy: fecha.getFullYear()
    }
    return formato.replace(/dd|mm|yyyy|yyy/gi, matched => map[matched])
  }

  facturar() {
    let totalFactIva = 0;
    let formatearCarrito = [...this.carritoProducto]
    let factSubtotal = 0;
    let facDescuento = 0;
    let facTotalBaseGravaba = 0;
    let facTotalBaseCero = 0;

    if (formatearCarrito.length===0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El carrito no debe estar vacio.',
        timer:1500
      })
    } else{
      formatearCarrito.forEach(element => {
        let idProducto = element.idProducto
        totalFactIva = totalFactIva + element.detIva;
        factSubtotal = factSubtotal + element.detSubtotaldescuentoporcantidad
        facDescuento = facDescuento + element.detTotaldescuento

        if (element.detIva === 0) {
          facTotalBaseCero = facTotalBaseCero + element.detSubtotaldescuentoporcantidad

        } else {
          facTotalBaseGravaba = facTotalBaseGravaba + element.detSubtotaldescuentoporcantidad
        }
        element.detDescripcion = element.prodNombre
        element.detCodIva = "2"
        element.detValorIce = 0
        element.detTipoVenta = 'NORMAL'
        element.detCodTipoVenta = "0"
        element.idProducto = { "idProducto": idProducto }
      })

      let modeloFactura = {
        factura: {
          facFecha: this.fechaActual(),
          facSubtotal: factSubtotal,
          facIva: totalFactIva,
          facTotal: factSubtotal + totalFactIva,
          facTotalBaseGravaba: facTotalBaseGravaba,
          facTotalBaseCero: facTotalBaseCero,
          facDescuento: facDescuento,

          facEstado: "PA",
          facTipo: "FACT",
          facAbono: 0,
          facSaldo: 0,
          facDescripcion: "",
          facNumProforma: 0,
          tipodocumento: "01",
          puntoemision: this.usuario.codTipoambiente.amPtoemi,
          codestablecimiento: "001",
          facCodIce: "3",
          facCodIva: "2",
          codigoPorcentaje: "2",
          facPorcentajeIva: "12",
          facMoneda: "DOLAR",
          facPlazo: 15,
          facSubsidio: 0,
          facSaldoAmortizado: 0,
          facUnidadTiempo: "DIAS",
          facNumNotaEntrega: 0,
          faConSinGuia: "SG",
          facValorIce: 0,
          idCliente: {
            idCliente: this.usuario.idCliente
          },
          cod_tipoambiente: {
            codTipoambiente: this.codTipoambiente
          }
        },
        detalleFactura: formatearCarrito

      }
      this.cnx.crearFactura(modeloFactura)
      this.carritoProducto = [];
    }
  }

  eliminarCampos(item) {
    delete item.idSubCategoria
    delete item.pordCostoCompra
    delete item.pordCostoPromedioCompra
    delete item.pordCostoVentaFinal
    delete item.pordCostoVentaRef
    delete item.precioNuevo
    delete item.proGlp
    delete item.prodAbreviado
    delete item.prodCantMinima
    delete item.prodCantidadInicial
    delete item.prodCodigo
    delete item.prodCostoPreferencial
    delete item.prodCostoPreferencialDos
    delete item.prodCostoPreferencialTres
    delete item.prodEsproducto
    delete item.prodEstado
    delete item.prodFactorConversion
    delete item.prodFechaRegistro
    delete item.prodGrabaIce
    delete item.prodGrabaIva
    delete item.prodImprimeCodbar
    delete item.prodIva
    delete item.prodManoObra
    delete item.prodNombre
    delete item.prodPathCodbar
    delete item.prodPorcentajeIce
    delete item.prodPrecioSinSubsidio
    delete item.prodPrincipal
    delete item.prodQr
    delete item.prodSubsidio
    delete item.prodTieneSubsidio
    delete item.prodTrasnporte
    delete item.prodUnidadConversion
    delete item.prodUnidadMedida
    delete item.prodUtilidadDos
    delete item.prodUtilidadNormal
    delete item.prodUtilidadPreferencial
    delete item.totalPagarPorProducto
  }
}

