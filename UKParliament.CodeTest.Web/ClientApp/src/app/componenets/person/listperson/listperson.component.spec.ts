import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpersonComponent } from './listperson.component';

describe('ListpersonComponent', () => {
  let component: ListpersonComponent;
  let fixture: ComponentFixture<ListpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
