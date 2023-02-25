import { Component, OnInit, ContentChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';
import Swal from 'sweetalert2';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  click = false;
  loginForm = new FormGroup({
    usuarionombre: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private ld: LoadingController,
    public alertController: AlertController,
    private cnx: ConeccionapiService,
    private loadingController: LoadingController,
    private router: Router) {


  }

  @ContentChild(IonInput) input: IonInput;

  ngOnInit() {
  }

  toggleShow() {
    let password = document.getElementById('password');
    console.log(this.click)
    if (!this.click) {
      password.setAttribute("type", 'text')
      this.click = true
    } else if (this.click) {
      password.setAttribute("type", 'password');
      this.click = false
    }
  }

  async autentificar() {
    let ipServidor = localStorage.getItem('ipservidor')
    let puerto = localStorage.getItem('puerto')

    if (ipServidor && puerto) {
      this.cnx.login(this.loginForm.value.usuarionombre, this.loginForm.value.password)
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error!',
        text: 'Por favor ingrese la configuración del servidor',
        showConfirmButton: false,
        timer: 2000,
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

  }
}