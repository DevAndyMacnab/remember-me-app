import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GetMessage, PostMessage } from 'src/app/models/message.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getMessage(): Observable<GetMessage> {
    return this.http.get<GetMessage>( environment.API_SERVER+'/random-message').pipe(
      tap(),
      catchError(err => { throw err })
    )
  }

  createMessage(message: PostMessage): Observable<any> {
    return this.http.post<PostMessage>(environment.API_SERVER+'/create-message', message, this.httpHeader).pipe(
      catchError(err => { throw err })
    )
  }
}
