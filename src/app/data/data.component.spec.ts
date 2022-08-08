import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FakeService } from '../services/fake.service';
import {jest} from '@jest/globals'
import { DataComponent } from './data.component';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;

  beforeEach(async () => {

    fakeServiceMock = {
      getDataV1: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ DataComponent ],
      providers: [
        {
          provide: FakeService, useValue: fakeServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set serviceData', ()=>{
    const expRes = {
      name: 'Facundo'
    }

    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.serviceData).toEqual(expRes)
  })

  it('should serviceData throw error message', ()=>{
    const errRes = new HttpErrorResponse ({
      error: 'test 404 error',
      status:404,
      statusText:'Not found'
    })

    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(throwError(()=> errRes));
    component.getServiceData();
    expect(component.errMessage).toBe(errRes.statusText)
  })

  it('should setGreeting good morning', ()=>{
    const expRes = {
      time:'10'
    }

    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good morning!')
  })

  it('should setGreeting good afternon', ()=>{
    const expRes = {
      time:'15'
    }

    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good afternon!')
  })

  it('should setGreeting good evening', ()=>{
    const expRes = {
      time:'21'
    }

    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good evening!')
  })

});
