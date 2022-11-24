import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;



  constructor(private formBuilder: FormBuilder,
    private ld: LoadingController,
    public alertController: AlertController,
    private cnx: ConeccionapiService,
    private loadingController: LoadingController,
    private router: Router) {

    this.loginForm = formBuilder.group({
      usuarionombre: ['Darwin', Validators.required],
      password: ['Darwin2022', Validators.required]
    });
  }

  ngOnInit() {
  }

  async autentificar() {

    const loading = await this.loadingController.create({
      message: 'Verificando',
    });
    loading.present();
    //

    this.cnx.login(this.loginForm.value.usuarionombre, this.loginForm.value.password).subscribe(
      (ok: any) => {
        let usuario = ok;
        console.log("LOGIN ", ok);
        loading.dismiss();
        let idActividad = null;
        if (usuario.idActividad != null) {
          idActividad = usuario.idActividad.idTipoActividad
        }
        localStorage.setItem("idUsuario", usuario.idUsuario);
        localStorage.setItem("usuario", usuario.usuLogin);
        localStorage.setItem("password", usuario.usuPassword);
       // localStorage.setItem("personaempresa", usuario.usuPesonaEmpresa);
        //localStorage.setItem("idParroquia", usuario.idParroquia.idParroquia);
        //localStorage.setItem("idCanton", usuario.idParroquia.idCanton.idCanton);
      //  localStorage.setItem("idTipoActividad", idActividad);
      localStorage.setItem("codTipoambiente", usuario.codTipoAmbiente);
        localStorage.setItem("nombreperfil",usuario.usuNombre);
       // localStorage.setItem("paginweb",usuario.usuPagina);
       // localStorage.setItem("whatsappper",usuario.usuWhatsapp);

        // 
        this.router.navigateByUrl('principal');
      },
      error => {
        loading.dismiss();
        console.log(error);
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
