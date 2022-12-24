import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-admin-dialogs',
  templateUrl: './auth-admin-dialogs.component.html',
  styleUrls: ['./auth-admin-dialogs.component.scss']
})
export class AuthAdminDialogsComponent implements OnInit {

  public authAdmin!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _afs: Firestore,
    private _auth: Auth,
    private _router: Router,
    private _accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.initAuthFormSing()
  }

  initAuthFormSing(): void {
    this.authAdmin = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  login(): void {
    const { email, password } = this.authAdmin.value;
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
      if (user && user['role'] === ROLE.ADMIN) {
        this._router.navigate(['/admin']);
      }
      this._accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

}
