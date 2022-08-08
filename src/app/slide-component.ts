import { Component, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-slide',
  template: `
    <p>SLIDE </p>`,
  styleUrls: ['./app.component.sass'],
})

export class SlideComponent implements OnInit {
  title = 'Slide';

  constructor(private logger: LoggerService ) {}

    ngOnInit(): void {
        this.logger.log('Slide');
    }

}
