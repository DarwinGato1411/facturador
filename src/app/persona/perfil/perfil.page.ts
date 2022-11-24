import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import { MUsuario } from 'src/app/modelos/modelo.datos';
import { MustMatch } from 'src/app/Utils/MustMatch';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  registroForm: FormGroup;
  musuario;
  password;
  lstCaton;
  lstParroquia;
  objusu;
  persoemp
  idparroquia
  idcanton
  lstActividades
  tipocuenta
  idTipoActividad
  idUsuario
  nombreperfil
  paginweb
  whatsappper
  //usuarioUpdate: MUsuario = new MUsuario();

  constructor(private cnx: ConeccionapiService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public alertController: AlertController,
    private loadingController: LoadingController) {
      

    this.idUsuario = localStorage.getItem("idUsuario");
    this.musuario = localStorage.getItem("usuario");
    this.password = localStorage.getItem("password");
    // this.persoemp = localStorage.getItem("personaempresa");
    // this.idparroquia = localStorage.getItem("idParroquia");
    // this.idcanton = localStorage.getItem("idCanton");
    // this.idTipoActividad = localStorage.getItem("idTipoActividad");
    this.nombreperfil = localStorage.getItem("nombreperfil");
    // this.paginweb = localStorage.getItem("paginweb");
    // this.whatsappper = localStorage.getItem("whatsappper");

    

    this.getParroquia(this.idcanton);
    console.log('idTipoActividad', this.idTipoActividad)
    console.log('idTipoActividad', this.idTipoActividad)
    console.log('idTipoActividad', this.idTipoActividad)

    if (this.persoemp == 'PE') {
      this.tipocuenta = 'PERSONA'
    } else {

      this.tipocuenta = 'EMPRESA'
    }

    this.registroForm = formBuilder.group({
      // regnombreper: new FormControl(
      //   this.musuario,
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(
      //       "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
      //     ),
      //   ])
      // ),
      regnombreper: [this.musuario, Validators.required],
      regpasswordper: [this.password, Validators.required],
      regpasswordRepetper: [this.password, Validators.required],
      // cmbCantonper: [this.idcanton,],
      // cmbParroquiaper: [this.idparroquia,],
      // radioTipoper: [this.persoemp, Validators.required],
       nombreperfil: [this.nombreperfil, Validators.required],
      // whatsappper: [this.whatsappper, Validators.required],
      // paginweb: [this.paginweb],
      // cmbActividad: [this.idTipoActividad, Validators.required]

    },
      {
        validator: MustMatch("regpasswordper", "regpasswordRepetper"),
      }
    );
    /*llamada al servicio de parroquias */

    //

  }
  actualizarusuario() {
    /*this.usuarioUpdate.usuNombre = this.registroForm.value.nombreperfil;
    this.usuarioUpdate.usuLogin = this.registroForm.value.regnombreper;
    this.usuarioUpdate.usuPassword = this.registroForm.value.regpasswordper;
    this.usuarioUpdate.usuPagina = this.registroForm.value.paginweb;
    this.usuarioUpdate.usuWhatsapp = this.registroForm.value.whatsappper;
    this.usuarioUpdate.idParroquia.idParroquia = this.registroForm.value.cmbParroquiaper;
    this.usuarioUpdate.idActividad.idTipoActividad = this.registroForm.value.cmbActividad;
    console.log(this.usuarioUpdate)*/
    
    this.actualizarusu(this.idUsuario,
      this.registroForm.value.nombreperfil,
      this.registroForm.value.regnombreper,
      this.registroForm.value.regpasswordper,
      this.registroForm.value.regnombreper,
      this.registroForm.value.cmbParroquiaper,
      this.registroForm.value.cmbActividad,
      this.registroForm.value.paginweb,
      this.registroForm.value.whatsappper,
      this.persoemp

      );
  }

  ngOnInit() {
  //  this.getCanton();
   // this.cosultaractividades();
   

  }

  getCanton() {
    this.cnx.buscarcanton(1).subscribe(
      (datos: any) => {
        console.log(datos);
        this.lstCaton = datos;
      },
      error => {
        console.log(error);
      }
    );
  }
  cosultarparroquias() {
    this.getParroquia(this.registroForm.value.radioTipo);
  }
  getParroquia(idcantonpar) {
    console.log("idcantonpar ", idcantonpar)
    let idcanton = idcantonpar;

    this.cnx.buscarparroquia(idcanton).subscribe(
      (datos: any) => {
        console.log(datos);

        this.lstParroquia = datos;

      },
      error => {
        console.log(error);
      }
    );
  }
  cosultaractividades() {

    this.cnx.tipoactividadall().subscribe(
      (datos: any) => {
        console.log(datos);

        this.lstActividades = datos;

      },
      error => {
        console.log(error);
      }
    );
  }


  /*OBTENEMOS LOS DATOS DEL API REST*/
  async actualizarusu(idUsuario,usuNombre,usuLogin, usuPassword,usuCorreo, idParroquia,idTipoActividad,usuPagina,usuWhatsapp,usuPesonaEmpresa) {

    const loading = await this.loadingController.create({
      message: 'Actualizando..',
    });
    loading.present();
    //

    this.cnx.actualizarusuario(idUsuario,usuNombre,usuLogin, usuPassword,usuCorreo, idParroquia,idTipoActividad,usuPagina,usuWhatsapp,usuPesonaEmpresa).subscribe(
      (ok: any) => {


        loading.dismiss();


        console.log(ok);
        //   this.router.navigateByUrl('tabprincipal');
      },
      error => {
        loading.dismiss();
        console.log(JSON.stringify(error));
        alert(JSON.stringify(error));
        this.presentAlert('Error de datos ....');
      }

    );

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


}
