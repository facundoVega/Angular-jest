import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asynchronous',
  templateUrl: './asynchronous.component.html',
  styleUrls: ['./asynchronous.component.sass']
})
export class AsynchronousComponent implements OnInit {

  timeoutResponse: string = 'test';


  constructor() { }

  ngOnInit(): void {
  }

  checkSetTimeout() {
    setTimeout(() =>{
      console.log('Inside set timeout');
      this.timeoutResponse = 'setTimeoutCheck'
    }, 1000)
  }

}
