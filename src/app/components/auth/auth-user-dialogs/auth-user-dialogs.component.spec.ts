import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserDialogsComponent } from './auth-user-dialogs.component';

describe('AuthUserDialogsComponent', () => {
  let component: AuthUserDialogsComponent;
  let fixture: ComponentFixture<AuthUserDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthUserDialogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUserDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
