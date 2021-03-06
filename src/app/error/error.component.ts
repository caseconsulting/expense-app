import { Component } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { Subscription } from 'rxjs/Subscription';

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
    switch (error.status) {
      case 404: this.errorMessage = `${error.type} was not found!`;
        break;
      case 409: this.errorMessage = `That ${error.type} already exists!`;
        break;
      case 406: this.errorMessage = 'Not an Acceptable submittion';
        break;
      case 422: this.errorMessage = 'This expense will put you over budget';
        break;
      case 500: this.errorMessage = 'Server unavailable';
        break;
      default: this.errorMessage = 'Unexpected error :/';
    }
    this.hideError = false;
  }

}
