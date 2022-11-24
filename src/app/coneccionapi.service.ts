import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MUsuario } from './modelos/modelo.datos';


@Injectable({
  providedIn: 'root'
})
export class ConeccionapiService {

  URLAPI = 'http://localhost:8087/api/';

  constructor(public http: HttpClient) { }
  /*
   login(inusuario, inpassword) {
     const urlServer = this.URL + 'usuarios.php';
     let body = new HttpParams();
     body = body.set('usuario', inusuario);
     body = body.set('password', inpassword);
     body = body.set('op', 'login');    
     return this.http.post(urlServer, body, { responseType: 'json' });
   }
 
   paises() {
     return this.http.get(this.URLAPI, { responseType: 'json' });
   }
 */

  /*SERVICIO PARA PRODUCTOS Y SERVICIOS*/
  buscarproductos(descripcion, codTipoambiente) {

    //ahi esta
    let tipo = 'productos/';
    console.log("BANDERA ......")
   /* if (bandera != 'prod') {
      tipo = 'servicios/';
    }*/
    console.log(descripcion)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      prodNombre: descripcion,
      codTipoambiente: codTipoambiente
    };
    console.log("urlServer ---------- ", urlServer)
    console.log("postParam ---------- ", postParam)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
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

    //ahi esta
    let tipo = 'loginservicios/';

    console.log(nombre)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      usuLogin: nombre,
      usuPassword: password
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
   /* if (bandera != 'prod') {
      tipo = 'servicios/';
    }*/
    console.log(descripcion)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      prodNombre: descripcion,
      codTipoambiente: codTipoambiente
    };
    console.log("urlServer ---------- ", urlServer)
    console.log("postParam ---------- ", postParam)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.post(urlServer, postParam, httpOptions);
    return this.http.post(urlServer, postParam, httpOptions);
  }


  /*SERVICIO PARA clientes*/
  buscarfacturas(descripcion, codTipoambiente) {

    //ahi esta
    let tipo = 'facturas/';
    console.log("BANDERA ......")
   /* if (bandera != 'prod') {
      tipo = 'servicios/';
    }*/
    console.log(descripcion)
    const urlServer = this.URLAPI + tipo;

    const postParam = {
      prodNombre: descripcion,
      codTipoambiente: codTipoambiente
    };
    console.log("urlServer ---------- ", urlServer)
    console.log("postParam ---------- ", postParam)
    //ahi funciona pero si le agrego eñ httOptions no reconoce
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.post(urlServer, postParam, httpOptions);
    return this.http.post(urlServer, postParam, httpOptions);
  }

}
