import { Component, ChangeDetectionStrategy } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {  EMPTY, Subject } from 'rxjs';


import { PlayerService } from '../player.service';

@Component({
  selector: 'player-list-skill',
  styleUrls:['./player-list-skill.component.css'],
  templateUrl: './player-list-skill.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PlayerListSkillComponent  {
  pageTitle = 'Players';
  // selectedProductId: number;
  private errorMessageSubject=new Subject<string>();
  errorMessageAction$=this.errorMessageSubject.asObservable()

  selectedPlayerId$=this.playerService.selectPlayer$;
  players$=this.playerService.playerWithCategory$.pipe(
    catchError(err=>{
      this.errorMessageSubject.next(err)
      return EMPTY;
    }
      )
  );

  constructor(private playerService: PlayerService) { }



  onSelected(playerId: number): void {
    this.playerService.selectedPlayerCahnged(playerId);
  }
}
