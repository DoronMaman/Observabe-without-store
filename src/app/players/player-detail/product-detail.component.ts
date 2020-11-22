import { Component } from '@angular/core';

import { PlayerService } from '../player.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'player-detail',
  styleUrls:['./player-detail.component.css'],
  templateUrl: './player-detail.component.html'
})
export class PlayerDetailComponent {
  pageTitle = 'Player Detail';
  errorMessage = '';
  product;

  constructor(private playerService: PlayerService) { }
  players$=this.playerService.selectPlayer$.pipe(
    catchError(err=>{
      this.errorMessage=err;
      return EMPTY;
    }
      )
  )

}
