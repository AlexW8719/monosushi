import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { AccountService } from '../shared/services/account/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private _router: Router,
    private _accountService: AccountService,
  ) { }

  ngOnInit(): void {
  }

  exit(): void {
    this._accountService.outLogin();
  }
}
