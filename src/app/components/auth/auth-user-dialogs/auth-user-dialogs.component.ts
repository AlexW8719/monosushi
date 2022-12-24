import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-user-dialogs',
  templateUrl: './auth-user-dialogs.component.html',
  styleUrls: ['./auth-user-dialogs.component.scss']
})
export class AuthUserDialogsComponent implements OnInit {

  public authUser!: FormGroup;

  public switchUser = true;

  constructor(
    private _auth: Auth,
    private _afs: Firestore,
    private _router: Router,
    private accountService: AccountService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AuthUserDialogsComponent>,
  ) { }

  ngOnInit(
  ): void {
    this.initAuthFormSing()
  }

  login(): void {
    const { email, password } = this.authUser.value;
    this.log(email, password).then(() => {
      console.log(`login done`);
    }).catch((error) => {
      console.log(`Login error =>`, error)
    })
  }

  async log(email: string, password: string): Promise<void> {
    const CREDENTIAL = await signInWithEmailAndPassword(this._auth, email, password);
    docData(doc(this._afs, 'users', CREDENTIAL.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: CREDENTIAL.user.uid };
      localStorage.setItem('authorizedUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this._router.navigate(['/user']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const { email, password } = this.authUser.value;
    this.emailSingUp(email, password).then().catch()
    this.switchUser = true;
    this.authUser.reset()
  }

  async emailSingUp(email: string, password: string): Promise<any> {
    const CREDENTIAL = await createUserWithEmailAndPassword(this._auth, email, password);
    const USER = {
      email: CREDENTIAL.user.email,
      firstName: this.authUser.value.firstName,
      lastName: this.authUser.value.lastName,
      phoneNumber: this.authUser.value.phoneNumber,
      orders: [],
      role: "user",
      address: "",
    };
    console.log()
    setDoc(doc(this._afs, 'users', CREDENTIAL.user.uid), USER);
  }

  openSingUpForm(): void {
    this.switchUser = false;
  }

  openSingInForm(): void {
    this.switchUser = true;
  }

  initAuthFormSing(): void {
    this.authUser = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    })
  }
}
