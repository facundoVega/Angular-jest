import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { FakeService } from '../services/fake.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.sass']
})
export class DataComponent implements OnInit {

  constructor(private fakeService: FakeService) { }

  serviceData: any;
  errMessage: any;
  time: number = 0;
  greeting: any;

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
}
