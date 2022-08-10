import { Component, OnInit } from '@angular/core';
import { first, ignoreElements } from 'rxjs';
import { book } from '../models/book.model';
import { NotificationModel } from '../models/notificationModel';
import { FakeService } from '../services/fake.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.sass']
})
export class DataComponent implements OnInit {

  constructor(private fakeService: FakeService) { }

  myBooks: book[] = [];
  serviceData: any;
  errMessage: any;
  time: number = 0;
  greeting: any;
  innerTimer:any;
  nameMessage:string = '';

  ngOnInit(): void {
    this.getServiceData();
  }

  getServiceData() {
    this.fakeService.getDataV1().subscribe({
      next: data =>{
        this.serviceData = data;
        console.log(data)
        this.time = this.serviceData.time;
        this.setGreeting();
      },
      error: err =>{
        this.errMessage = err.statusText;
      },
      complete:()=>{ console.log('Finished')}
    })
  }
  

  setGreeting(): void{
    if(this.time < 12)
      this.greeting = 'Good morning!';
    
    if(this.time  > 12 && this.time  < 18)
      this.greeting = 'Good afternon!';
    
    if(this.time > 18)
      this.greeting = 'Good evening!';
  }

  public startMarkAsReadTimer(notificationModel: NotificationModel ): void {
    this.innerTimer = setTimeout(
      ()=>this.fakeService.useNotification(notificationModel),
      3000);
  }
  
  public stopMarkAsReadTimer(): void {
    if( this.innerTimer ) {
      clearTimeout(this.innerTimer)
      this.innerTimer = undefined;
    }
  }

  public returnFullNamePromise(name: string): Promise<string> {
    return new Promise((resolve, reject)=>{
      if(name=='Ryan')
        resolve('Correct name');
      else 
        reject('Wrong name');
    });
  } 

  async returnAsyncAwaitFullNamePromise(name: string): Promise<string> {
    const myPromise: Promise<string> = new Promise((resolve, reject)=>{
      if(name=='Ryan')
        resolve('Correct name');
      else 
        reject('Wrong name');
    });

    return await myPromise;
  } 

  setMessage(firstName: string): void{
    this.returnFullNamePromise(firstName)
    .then(
      (message: string) => this.nameMessage = `The message was: ${message}`
    )
    .catch(
      (error: string) => this.handleError(error)
    )
  }

  public handleError(error: string): void {
    console.error(error);
  }

  public setBooks(allBooks: book[]): void{
    this.myBooks = allBooks;
  }

}
