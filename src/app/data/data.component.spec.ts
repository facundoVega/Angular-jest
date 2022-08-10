import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FakeService } from '../services/fake.service';
import {jest} from '@jest/globals'
import { DataComponent } from './data.component';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationModel } from '../models/notificationModel';
import { book } from '../models/book.model';
import { BooksMock } from '../models/books.mock';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;

  beforeEach(async () => {

    fakeServiceMock = {
      getDataV1: jest.fn(),
      useNotification: jest.fn()
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

  describe('startMarkAsReadTimer',()=>{
    let notification: NotificationModel;

    beforeEach(()=>{
      notification = {
        text:'Testing text',
        type:'error'
      }
      jest.useFakeTimers();
    })

    afterEach(() =>{
      jest.clearAllTimers();
    })

    it('should map the setTimeout to innerTimer',()=>{
        component.innerTimer = undefined;

        component.startMarkAsReadTimer(notification);

        expect(component.innerTimer).toEqual(expect.any(Number));
    })
    
    it('should trigger useNotification when the settimeout fires after three seconds', ()=>{
      component.startMarkAsReadTimer(notification);

      jest.runOnlyPendingTimers();
      expect(fakeServiceMock.useNotification).toBeCalledWith(notification);
    })

    describe('startMarkAsReadTimer boundaries', ()=>{


      it('should not call to service before three seconds', ()=>{

        component.startMarkAsReadTimer(notification);
        jest.advanceTimersByTime(2999);
        expect(fakeServiceMock.useNotification).not.toBeCalled();
      })

      it('should  call to service after three seconds', ()=>{

        component.startMarkAsReadTimer(notification);
        jest.advanceTimersByTime(3001);
        expect(fakeServiceMock.useNotification).toBeCalledTimes(1);
      })

      it('should not call to service again after its been called', ()=>{

        component.startMarkAsReadTimer(notification);
        jest.advanceTimersByTime(12000);
        expect(fakeServiceMock.useNotification).toBeCalledTimes(1);
      })




    })
  })

  describe('stopMarkAsReaderTime', ()=>{

    it('should clear innerTimer if it has been set', () =>{
      component.innerTimer = setTimeout(()=>{}, 2000);
      component.stopMarkAsReadTimer();
      expect(component.innerTimer).toBeUndefined();
    })

  })

  describe('returnFullNamePromise', ()=>{

    it('should return correct name', ()=>{
      return expect(component.returnFullNamePromise('Ryan')).resolves.toBe('Correct name');
    })

    it('should reject and return wrong name', ()=>{
      return expect(component.returnFullNamePromise('Ryan2')).rejects.toBe('Wrong name');
    })

  })

  describe('returnAsyncAwaitFullNamePromise', ()=>{
    it('should resolve and return correct name', async ()=>{
      return await expect(component.returnAsyncAwaitFullNamePromise('Ryan')).resolves.toEqual('Correct name');
    })

    it('should reject and return correct name', async ()=>{
      return await expect(component.returnAsyncAwaitFullNamePromise('Ryan2')).rejects.toEqual('Wrong name');
    })

  })


  describe('setBooks', ()=>{
    let books: book[] = [];
    
    beforeEach(()=>{
      books = [
        new BooksMock().withCustomAuthor('Stephen king').withCustomISBN('1').withCustomYear(1991).withCustomTitle('It').Model(),
        new BooksMock().withCustomAuthor('Cortazar').withCustomISBN('2').withCustomTitle('Rayuela').withCustomYear(1970).Model(),
        new BooksMock().Model(),
        new BooksMock().Model(),
        new BooksMock().Model()
      ]
    })

    it('should set myBooks property', ()=>{

      component.setBooks(books);
      expect(component.myBooks).toBeTruthy();
      expect(component.myBooks.length).toBe(5);
      expect(component.myBooks).toEqual(books);
    })

  })

});
