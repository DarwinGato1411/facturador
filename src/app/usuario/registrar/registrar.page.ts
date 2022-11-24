import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import { MUsuario } from 'src/app/modelos/modelo.datos';
import { MustMatch } from 'src/app/Utils/MustMatch';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {


  registroForm: FormGroup;
  lstCaton;
  lstParroquia;
  usuario: MUsuario;
  respuesta;

  constructor(private cnx: ConeccionapiService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController) {

    this.registroForm = formBuilder.group({
      regnombre: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
          ),
        ])
      ),
      regpassword: ['', Validators.required],
      regpasswordRepet: ['', Validators.required],
      cmbCanton: ['',],
      cmbParroquia: ['',],
      radioTipo: ['PE', Validators.required],

    },
      {
        validator: MustMatch("regpassword", "regpasswordRepet"),
      }
    );
  }


  ngOnInit() {
    this.getCanton();
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

  getParroquia() {
    console.log("sss ", this.registroForm.value.radioTipo)
    let idcanton = this.registroForm.value.cmbCanton;

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


  registrarusuario() {
    console.log("Registro ", this.registroForm.value.radioTipo)
    let idcanton = this.registroForm.value.cmbCanton;
    /*
        this.usuario.usuLogin=this.registroForm.value.regnombre;
        this.usuario.usuCorreo=this.registroForm.value.regnombre;
        this.usuario.usuPassword=this.registroForm.value.regpassword;
        this.usuario.idParroquia.idParroquia=this.registroForm.value.cmbCanton;
    */
    this.cnx.crearusuario(
      this.registroForm.value.regnombre,
      this.registroForm.value.regpassword,
      this.registroForm.value.cmbParroquia,
      this.registroForm.value.radioTipo).subscribe(
        (datos: any) => {
          console.log(datos);
          this.navCtrl.navigateForward('/tabprincipal/login');
          // this.respuesta = datos;

        },
        error => {
          console.log(error);
        }
      );
  }
 regresarlogin(){

  this.navCtrl.navigateForward('/tabprincipal/login');
 }

}
