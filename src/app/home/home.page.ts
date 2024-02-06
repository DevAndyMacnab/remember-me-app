import { Component } from '@angular/core';
import { MessageService } from '../services/Message/message.service';
import { Router } from '@angular/router';
import { PushNotificationSchema, PushNotifications } from '@capacitor/push-notifications';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  id: string = ""
  titulo: string = ""
  contenido: string = ""
  tipo: string = ""
  estado: string = ""
  token: string = ""

  constructor(
    private backend: MessageService,
    private router: Router

  ) {
    
    this.getMessage();
  }

  async getMessage() {
    this.backend.getMessage().subscribe((data) => {
      console.log(data)
      this.titulo = data.titulo
      this.contenido = data.contenido
    })

  }

  async goCreateMessage() {
    this.router.navigate(['/create-message'])

  }

  async afiliarNotificaciones() {

    PushNotifications.requestPermissions().then((permission) => {

      if (permission.receive === 'granted') {

        PushNotifications.register()

      } else {
        alert("Lo siento pero no has aceptado las notificaciones :(")
      }
    })
    PushNotifications.addListener('registration', token => {
      console.log(token.value)
      this.token = token.value

    }).catch(error => alert(error.message))

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // Manejar la notificación recibida
        console.log('Notificación recibida:', notification);
      }
    )};

}
