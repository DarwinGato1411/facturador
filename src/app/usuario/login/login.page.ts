import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import Swal from 'sweetalert2';
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
    let ipServidor=localStorage.getItem('ipservidor')
    if(ipServidor){
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
          localStorage.setItem("password", usuario.usuPassword)
          
          localStorage.setItem("codTipoambiente", usuario.codTipoAmbiente);
          localStorage.setItem("nombreperfil", usuario.usuNombre);
          this.router.navigateByUrl('principal');
        },
        error => {
          loading.dismiss();
          console.log(error);
          this.presentAlert('Error de datos ....');
        }
  
      )
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'ok!',
        text: 'Por favot introdusca la ip de su servidor',
        timer: 1500
      })
    }

   

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
