import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FakeService } from './fake.service';
import {jest} from '@jest/globals'
import { of, throwError } from 'rxjs';
import { exec } from 'child_process';

describe('FakeService', () => {
  let service: FakeService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    }

    service = new FakeService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getDataV1', () => {
    const url = 'https://jsonplaceholder.typicodecom/todos/1';
    const res = 'myValue';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    
    service.getDataV1();

    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toBeCalledWith(url);
  });

  it('should test getDataV2', (done: () => void) => {
    const url = 'https://jsonplaceholder.typicodecom/todos/1';
    const res = 'myValue';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    
    service.getDataV2().subscribe({
      next: (data) =>{
        expect(data).toBe(res);
        done()
      },
      error: error => console.log(error)
    });

    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toBeCalledWith(url);
  });

  it('getDataV2 should throw an error', (done: () => void) => {
    const url = 'https://jsonplaceholder.typicodecom/todos/1';
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(()=> errorResponse));
    
    service.getDataV2().subscribe({
      error: error => {
        expect(error.message).toContain('test 404 error')
        done()
      }
    });

    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toBeCalledWith(url);
  });

  it('should test postDataV1', ()=>{
    const command = 'testing';
    const res = 'testingResponse';
    
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));

    service.postDataV1(command);

    expect(httpClientSpy.post).toBeCalledTimes(1);
  })

  it('should test postDatav1 result', (done: () => void) =>{
    const command = 'testing';
    const res = 'testingResponse';
    
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));

    service.postDataV1(command).subscribe({
      next:data =>{
        expect(data).toBe(res)
        done()
      }
    });

    expect(httpClientSpy.post).toBeCalledTimes(1);
  })

});
