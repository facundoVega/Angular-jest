import { Component, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';



@Component({
  selector: 'app-gallery',
  template: `
    <div>
        <h1>Gallery</h1>
        <ng-content></ng-content>
    </div>`,
  styleUrls: ['./app.component.sass'],
  viewProviders:[LoggerService],
  
})

export class GalleryComponent implements OnInit {
  title = 'Gallery component';

  constructor(private logger: LoggerService) {}

  ngOnInit(): void{
    this.logger.log('Gallery');
  }

}
