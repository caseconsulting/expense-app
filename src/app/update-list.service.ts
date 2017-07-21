import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UpdateListService {

  // Observable string sources
  private updateAnnouncedSource = new Subject<string>();
  // private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  updateAnnounced$ = this.updateAnnouncedSource.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceUpdate(caller: string) {
    this.updateAnnouncedSource.next(caller);
  }

  // confirmMission(astronaut: string) {
  //   this.missionConfirmedSource.next(astronaut);
  // }
}
