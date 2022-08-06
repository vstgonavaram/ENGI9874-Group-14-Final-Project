import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnivApplicationsComponent } from './univ-applications.component';

describe('UnivApplicationsComponent', () => {
  let component: UnivApplicationsComponent;
  let fixture: ComponentFixture<UnivApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnivApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnivApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
