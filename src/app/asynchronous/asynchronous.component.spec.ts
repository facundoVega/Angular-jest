import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsynchronousComponent } from './asynchronous.component';

describe('AsynchronousComponent', () => {
  let component: AsynchronousComponent;
  let fixture: ComponentFixture<AsynchronousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsynchronousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    fixture = TestBed.createComponent(AsynchronousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should time out response', () => {
    component.checkSetTimeout();
    expect(component.timeoutResponse).not.toBe('setTimeoutCheck');
    jest.runAllTimers();
    expect(component.timeoutResponse).toBe('setTimeoutCheck');
    expect(setTimeout).toBeCalledTimes(1);
  });
});
