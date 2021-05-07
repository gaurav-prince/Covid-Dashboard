import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxygenresourceComponent } from './oxygenresource.component';

describe('OxygenresourceComponent', () => {
  let component: OxygenresourceComponent;
  let fixture: ComponentFixture<OxygenresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxygenresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxygenresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
