import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.sass']
})
export class MatchesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public myFunction(): void{
    throw new Error('you are using old angular version');
  }
}
