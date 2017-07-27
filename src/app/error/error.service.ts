import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorService {

  // Observable string sources
  private errorAnnouncedSource = new Subject<any>();
  // private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  errorAnnounced$ = this.errorAnnouncedSource.asObservable();

  // Service message commands
  announceError(err: any) {
    this.errorAnnouncedSource.next(err);
  }

}
