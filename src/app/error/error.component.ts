import { Component } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { Subscription } from 'rxjs/Subscription';
import _ from 'lodash';
@Component({
  selector: 'exp-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage: string;
  hideError = true;
  subscription: Subscription;
  constructor(private errorService: ErrorService) {
    this.subscription = errorService.errorAnnounced$.subscribe(
      error => this.setError(error)
    )
  }
  setError(error: any) {

    this.hideError = false;
  }

}
