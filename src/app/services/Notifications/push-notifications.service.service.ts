import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TokenRegister } from 'src/app/models/token.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PushNotificationsServiceService {

  constructor(
    private http: HttpClient
  ) { }


  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  saveToken(tokeRegister: TokenRegister): Observable<any> {
    return this.http.post<TokenRegister>(environment.API_SERVER+'/save-token', tokeRegister, this.httpHeader).pipe(
      catchError(err => { throw err })
    )
  }
}
