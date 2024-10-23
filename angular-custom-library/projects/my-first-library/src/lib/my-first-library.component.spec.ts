import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstLibraryComponent } from './my-first-library.component';

describe('MyFirstLibraryComponent', () => {
  let component: MyFirstLibraryComponent;
  let fixture: ComponentFixture<MyFirstLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFirstLibraryComponent]
    });
    fixture = TestBed.createComponent(MyFirstLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
