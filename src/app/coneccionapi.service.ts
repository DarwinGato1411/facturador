import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MUsuario } from './modelos/modelo.datos';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConeccionapiService {

  URLAPI
  ipServidor
  puerto
  tipoconexion

  constructor(public http: HttpClient, private router: Router) {
    this.ipServidor = localStorage.getItem('ipservidor')
    this.puerto = localStorage.getItem('puerto')
    this.tipoconexion = localStorage.getItem('tipoconexion')

    this.URLAPI = `${this.tipoconexion}://${this.ipServidor}:${this.puerto}/api/`
  }
  ngOnInit() {

  }
  buscarproductos(descripcion, codTipoambiente) {
    let tipo = 'productos/';
    console.log("BANDERA ......")
    console.log(descripcion)
    const urlServer = this.URLAPI + tipo;
    const postParam = {
      prodNombre: descripcion,
      codTipoambiente: codTipoambiente
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.post(urlServer, postParam, httpOptions);
    return this.http.post(urlServer, postParam, httpOptions);
  }

  /*SERVICIO PARA OFERTA SERVICIOS*/
  buscarservicios(descripcion) {

    //ahi esta
    let tipo = 'ofertaservicios/';

    console.log(descripcion)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      ofeEstado: true,
      ofeNombre: descripcion,
      ofeDescripcion: descripcion,
    };

    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }


  /*SERVICIO PARA CANTON*/
  buscarcanton(idCanton) {

    //ahi esta
    let tipo = 'canton/';

    console.log(idCanton)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      idCanton: idCanton,

    };
    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }

  /*SERVICIO PARA PARROQUIA*/
  buscarparroquia(idCanton) {

    //ahi esta
    let tipo = 'parroquia/';

    console.log(idCanton)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      idCanton: idCanton,

    };
    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }



  /* LOGIN*/
  login(nombre, password) {
    this.ipServidor = localStorage.getItem('ipservidor')
    this.puerto = localStorage.getItem('puerto')
    // this.tipoconexion="http"
    this.tipoconexion = localStorage.getItem('tipoconexion')

    this.URLAPI = `${this.tipoconexion}://${this.ipServidor}:${this.puerto}/api/`

    let tipo = 'login/';

    console.log(nombre)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      usuLogin: nombre,
      usuPassword: password
    };
    
    fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(postParam),
      headers: { "Content-Type": "application/json" } 
    })
      .then(res => {
       
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Credenciales verificadas con éxito',
            timer: 1500
          })
          return res.json()
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Algo salió mal',
            text: 'Por favor revise las credenciales',
            timer: 1500
          })
        }
      })
      .then(ok => {
        let usuario = ok  
        let idActividad = null;
        if (usuario.idActividad != null) {
          idActividad = usuario.idActividad.idTipoActividad
        }
        localStorage.setItem("idUsuario", usuario.idUsuario);
        localStorage.setItem("usuario", usuario.usuLogin);
        localStorage.setItem("password", usuario.usuPassword)
        localStorage.setItem("codTipoambiente", usuario.codTipoAmbiente);
        localStorage.setItem("nombreperfil", usuario.usuNombre);
        this.router.navigateByUrl('principal');
      })
      .catch(err => Swal.fire({
        icon: 'warning',
        title: 'Algo salió mal',
        text:"Por favor revise las credenciales o la configuración al servidor"+ err,
      }))
  }


  /*CREAR USSUARIO*/
  crearusuario(nombre, password, idParroquia, tipoemp) {

    //ahi esta
    let tipo = 'crearusuario/';

    console.log(nombre)
    const urlServer = this.URLAPI + tipo;
    const postParam = {
      usuPesonaEmpresa: tipoemp,
      usuLogin: nombre,
      usuPassword: password,
      usuCorreo: nombre,
      idParroquia: {
        idParroquia: idParroquia
      }

    };
    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }


  /*CREAR USSUARIO*/
  actualizarusuario(idUsuario, usuNombre, usuLogin, usuPassword, usuCorreo, idParroquia, idTipoActividad, usuPagina, usuWhatsapp, usuPesonaEmpresa) {
    //actualizarusuario(usuario:MUsuario) {

    //ahi esta
    let tipo = 'crearusuario/';

    console.log(usuNombre)
    const urlServer = this.URLAPI + tipo;


    const postParam = {
      idUsuario: idUsuario,
      usuPesonaEmpresa: usuPesonaEmpresa,
      usuNombre: usuNombre,
      usuLogin: usuLogin,
      usuPassword: usuPassword,
      usuCorreo: usuCorreo,
      usuWhatsapp: usuWhatsapp,
      usuPagina: usuPagina,
      idParroquia: {
        idParroquia: idParroquia,
      },
      idActividad: {
        idTipoActividad: idTipoActividad
      },

    };
    /*const postParam = {
      usuPesonaEmpresa: usuario.usuPesonaEmpresa,
      usuNombre:usuario.usuNombre,
      usuLogin: usuario.usuLogin,
      usuPassword: usuario.usuPassword,
      usuCorreo: usuario.usuCorreo,
      usuWhatsapp:usuario.usuWhatsapp,
      usuPagina:usuario.usuPagina,
      idParroquia: {
        idParroquia: usuario.idParroquia.idParroquia,
      },
      idActividad: {
        idTipoActividad: usuario.idActividad.idTipoActividad
    },

    };*/
    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }


  /*TIPO ACTIVIDAD*/
  tipoactividadall() {

    //ahi esta
    let tipo = 'tipoactividad/';

    const urlServer = this.URLAPI + tipo;

    const postParam = {
      idActividad: 1
    };
    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }

  /*SERVICIO PARA OFERTA SERVICIOS*/
  buscarserviciosusuario(descripcion, idUsuario) {

    //ahi esta
    let tipo = 'ofertaserviciosid/';

    console.log(" ", descripcion, idUsuario)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      ofeEstado: true,
      ofeNombre: descripcion,
      ofeDescripcion: descripcion,
      idUsuario: {
        idUsuario: idUsuario
      }
    };
    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }

  /*SERVICIO PARA OFERTA SERVICIOS*/
  eliminarservicio(idOfertaServicio, idUsuario) {

    //ahi esta
    let tipo = 'eliminarservicio/';

    console.log(" ", idOfertaServicio)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      idOfertaServicio: idOfertaServicio,
      idUsuario: {
        idUsuario: idUsuario
      }
    };
    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }

  /*BUSCA LOS LUGARES TURISTICOS ESTADO DESCRIPCION  Y NOMBRE*/
  turismoall(busqueda) {

    //ahi esta
    let tipo = 'turismoall/';

    console.log(" ", busqueda)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      turEstado: true,
      turDescripcion: busqueda
    };
    console.log("urlServer ---------- ", urlServer)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(urlServer, postParam, httpOptions);
  }



  /*SERVICIO PARA clientes*/
  buscarclientes(descripcion, codTipoambiente) {

    //ahi esta
    let tipo = 'clientes/';
    console.log("BANDERA ......")
  
    const urlServer = this.URLAPI + tipo;
    console.log(urlServer)
    const postParam = {
      prodNombre: descripcion,
      codTipoambiente: codTipoambiente
    };
    console.log('postParamClientes', postParam)
    console.log("urlServer ---------- ", urlServer)
    console.log("postParam ---------- ", postParam)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    
    //return this.http.post(urlServer, postParam, httpOptions);
    return this.http.post(urlServer, postParam);
  }


  /*SERVICIO PARA clientes*/
  buscarfacturas(descripcion, codTipoambiente, fechaincio, fechaFinal) {

    //ahi esta
    let tipo = 'facturas/';

    console.log(descripcion)
    const urlServer = this.URLAPI + tipo;
    
    const postParam = {
      prodNombre: descripcion,
      codTipoambiente: codTipoambiente,
      fin: fechaFinal,
      inicio: fechaincio,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.post(urlServer, postParam, httpOptions);
    return this.http.post(urlServer, postParam, httpOptions);
  }

  crearFactura(factura) {
    const tipo = 'factura-guardar/'
    const urlServer = this.URLAPI + tipo;

    fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(factura),
      headers: { "Content-type": "application/json;charset=UTF-8" }
    })
      .then(response => {
        console.log("estatus creacion factura", response.status)
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'ok!',
            text: 'Factura creada con éxito',
            timer: 1500
          })

          this.router.navigateByUrl('principal/iniciofactura');
          return response.json()
        }

      })
      .then(json => console.log(json))
      .catch(err => console.log(err))
  };

  crearCliente(cliente) {
    const tipo = 'clientes-crear-editar/'
    const urlServer = this.URLAPI + tipo;

    fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(cliente),
      headers: { "Content-type": "application/json;charset=UTF-8" }
    })
      .then(response => {
        console.log("estatus creacion cliente", response.status)
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'ok!',
            text: 'Cliente creado con exito',
            showConfirmButton: false,
            timer: 1500
          })

          // this.router.navigateByUrl('principal/misclientes');
          setTimeout(() => {
            location.href = 'principal/misclientes'
          }, 1500)
          return response.json()
        }
      })
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }

  crearProducto(producto) {
    const tipo = 'productos-crear-editar/'
    const urlServer = this.URLAPI + tipo;
    fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: { "Content-type": "application/json;charset=UTF-8" }
    })
      .then(response => {
        console.log("estatus creacion producto", response.status)
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'ok!',
            text: 'Producto creado con exito',
            timer: 1500,
            showConfirmButton: false,
          })
          setTimeout(() => {
            location.href = 'principal/misservicio'
          }, 1500)



          return response.json()
        }
      })
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }

  async facturaAutorizar(factura) {
    const tipo = 'facturas-enviar/'
    const urlServer = this.URLAPI + tipo;

    Swal.fire({
      icon: 'info',
      title: 'Verificando factura',
      text: 'Por favor espere un momento',
      showConfirmButton: false,

    })
    await fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(factura),
      headers: { "Content-type": "application/json;charset=UTF-8" }
    })
      .then(response => {
        console.log("estatus creacion producto", response.status)
        Swal.close()
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'ok',
            text: 'La factura ha sido autorizada',
            timer: 2000
          })

          setTimeout(() => {
            location.href = 'principal/listafactura'
          }, 2000)

          return response.json()
        }
      })
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }
}




