import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router,  ActivatedRoute} from '@angular/router';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {


  estado;
  fechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1
    let diaF=""+dia
    let mesF=""+mes
    dia<10?diaF=`0${dia}`:''
    mes<10?mesF=`0${mes}`:''
    
    const anio = fecha.getFullYear()
    return `${anio}-${mesF}-${diaF}`
  }


  cliente = new FormGroup({
    idCliente:new FormControl(),
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
  constructor(private cnx: ConeccionapiService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.estado = this.route.snapshot.paramMap.get('estado');
    if(this.estado==="Editar"){
      let {idTipoIdentificacion,
        cliCedula ,
        ciudad,
        cliNombre,
        clieFechaRegistro,
        cliTelefono,
        cliMovil,
        cliDireccion,
        cliCorreo,
        clietipo,
        idCliente
      }=JSON.parse(localStorage.getItem('clienteEditar'))
      
      this.cliente.controls.idCliente.setValue(idCliente)
      this.cliente.controls.idTipoIdentificacion.setValue(idTipoIdentificacion.idTipoIdentificacion)
      this.cliente.controls.cliCedula.setValue(cliCedula)
      this.cliente.controls.ciudad.setValue(ciudad)
      this.cliente.controls.cliNombre.setValue(cliNombre)
      this.cliente.controls.clieFechaRegistro.setValue(clieFechaRegistro)
      this.cliente.controls.cliTelefono.setValue(cliTelefono)
      this.cliente.controls.cliMovil.setValue(cliMovil)
      this.cliente.controls.cliDireccion.setValue(cliDireccion)
      this.cliente.controls.cliCorreo.setValue(cliCorreo)
      this.cliente.controls.clietipo.setValue(clietipo) 
    }
  }

  guardarDatos() {
    let codTipoambiente = localStorage.getItem("codTipoambiente")
    let {cliCedula,ciudad,cliNombre,cliTelefono,cliMovil,cliDireccion,cliCorreo} =this.cliente.controls

    if(cliCedula.value===''||
    ciudad.value===''||
    cliNombre.value===''||
    cliTelefono.value===''||
    cliMovil.value===''||
    cliDireccion.value===''||
    cliCorreo.value===''){
      Swal.fire({
        icon: 'warning',
        text: 'Por favor verifique que todos los campos esten llenos',
        timer: 3000
      })
    }else{
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
}
