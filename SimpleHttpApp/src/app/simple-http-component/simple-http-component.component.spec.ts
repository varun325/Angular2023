import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHttpComponentComponent } from './simple-http-component.component';

describe('SimpleHttpComponentComponent', () => {
  let component: SimpleHttpComponentComponent;
  let fixture: ComponentFixture<SimpleHttpComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleHttpComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleHttpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
