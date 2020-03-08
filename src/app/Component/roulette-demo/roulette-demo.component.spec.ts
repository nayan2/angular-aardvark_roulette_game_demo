import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteDemoComponent } from './roulette-demo.component';

describe('RouletteDemoComponent', () => {
  let component: RouletteDemoComponent;
  let fixture: ComponentFixture<RouletteDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouletteDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
