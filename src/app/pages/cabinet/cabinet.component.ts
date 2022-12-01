import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  constructor(
    private _accountService: AccountService,
  ) { }

  ngOnInit(): void {
  }

  exit(): void {
    this._accountService.outLogin();
  }
}
