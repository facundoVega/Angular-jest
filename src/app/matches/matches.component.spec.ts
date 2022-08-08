import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesComponent } from './matches.component';

describe('MatchesComponent', () =>  {
  let component: MatchesComponent;
  let fixture: ComponentFixture<MatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('two plus two is four', () => {
    expect('learning test').toBe('learning test');
  });

  it('Object values', () => {
    const data = {name: 'Facundo'}
    expect(data).toEqual({name: 'Facundo'});
  });

  it('method exception', ()=>{
    expect(()=> component.myFunction()).toThrow(Error);
    expect(()=> component.myFunction()).toThrow('you are using old angular version');
    expect(()=> component.myFunction()).toThrow(/angular/);

  })

  it('null values', ()=>{
    const data = 0;

    expect(data).not.toBeTruthy();
    expect(data).toBeFalsy();
    expect(data).not.toBeUndefined();
    expect(data).toBeDefined();
  
  
  })

});
