import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UpdateListService {

  // Observable string sources
  private updateAnnouncedSource = new Subject<boolean>();
  // private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  updateAnnounced$ = this.updateAnnouncedSource.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceUpdate(update: boolean) {
    this.updateAnnouncedSource.next(update);
  }

  // confirmMission(astronaut: string) {
  //   this.missionConfirmedSource.next(astronaut);
  // }
}
