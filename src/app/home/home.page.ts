import { Component } from '@angular/core';
import { MessageService } from '../services/Message/message.service';
import { PushNotificationsServiceService } from '../services/Notifications/push-notifications.service.service';
import { Router } from '@angular/router';
import { PushNotificationSchema, PushNotifications } from '@capacitor/push-notifications';
import { TokenRegister } from '../models/token.interface';
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
  permStatus: any = ""

  constructor(
    private backend: MessageService,
    private saveTokenService: PushNotificationsServiceService,
    private router: Router

  ) {

    this.getMessage();
    this.CheckPermission()
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

      const permission = await PushNotifications.requestPermissions()

      if (permission.receive === 'granted') {
        await PushNotifications.register()

        await PushNotifications.addListener('registration', token => {
          
          const savingToken: TokenRegister = {
            token: token.value,
            Estado: 1
          }
          this.saveTokenService.saveToken(savingToken).subscribe((data) => {
            //alert(data.data)
            if(data.error){
              alert("Algo ha salido mal, porfavor intente de nuevo")
              PushNotifications.unregister()
            }else{
              alert("Notis Aceptadas :)")
            }
            
          })

        }).catch(error => alert(error.message))

      } else {
        alert("Lo siento pero no has aceptado las notificaciones :(")
      }

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // Manejar la notificación recibida
        console.log('Notificación recibida:', notification);
      }
    )
  };

  async CheckPermission() {
    //Verificamos primero si aun no ha dado permisos para las notificaciones
    this.permStatus = await PushNotifications.checkPermissions()
    

    if (this.permStatus.receive === 'prompt' || this.permStatus.receive==='prompt-with-rationale') {
      await this.afiliarNotificaciones()
    }

  }

}
