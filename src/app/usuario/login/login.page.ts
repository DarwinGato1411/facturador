import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConeccionapiService } from 'src/app/coneccionapi.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  

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

  ngOnInit() {
  }

  async autentificar() {
    let ipServidor=localStorage.getItem('ipservidor')
    
    if(ipServidor){
      this.cnx.login(this.loginForm.value.usuarionombre, this.loginForm.value.password)
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
