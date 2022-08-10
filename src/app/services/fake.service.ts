import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { NotificationModel } from '../models/notificationModel';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  markAsReadInterval: any;

  constructor(private http: HttpClient) { }
  getDataV1(): Observable<any>{
    const url= 'https://jsonplaceholder.typicodecom/todos/1';
    return this.http.get(url);
  }

  getDataV2(): Observable<any>{
    const url= 'https://jsonplaceholder.typicodecom/todos/1';
    return this.http.get(url).pipe(
      tap((data: any) => console.log('Data fetched', data)),
      catchError(this.handleError('Failed to fetch data'))
    );
  }

  postDataV1(data: any): Observable<any>{
    const url= 'https://jsonplaceholder.typicodecom/todos/1';
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    }
    
    return this.http.post(data, url, httpOptions);
  }

  private handleError<T>(operation = 'operation'){
    return (error: HttpErrorResponse): Observable<T> => {
   

      const message = `server returned code ${error.status } with body "${error.error}"` ;

      throw new Error(`${operation} failed ${message}`);
    }
    
  }

  public useNotification(notification: NotificationModel): void {
    if(notification.text === 'error')
      console.error(`${notification.text}`);
    if(notification.text === 'common')
      console.error(`${notification.text}`);
  }

  public startMarkAsReadInterval(): void {
    this.markAsReadInterval = setInterval(
      this.markNotificationAsRead,
      5000
    )
  }

  public markNotificationAsRead(): void{

  }

} 
