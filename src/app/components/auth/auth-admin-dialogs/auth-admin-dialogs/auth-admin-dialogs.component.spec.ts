import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAdminDialogsComponent } from './auth-admin-dialogs.component';

describe('AuthAdminDialogsComponent', () => {
  let component: AuthAdminDialogsComponent;
  let fixture: ComponentFixture<AuthAdminDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthAdminDialogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAdminDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
