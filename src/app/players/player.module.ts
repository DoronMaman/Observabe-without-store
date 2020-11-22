import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayerListComponent } from './player-list/player-list.component';
import { CardAndPlayerComponent } from './card-and-player/card-and-player.component';
import { PlayerDetailComponent } from './player-detail/product-detail.component';

import { SharedModule } from '../shared/shared.module';
import { PlayerListSkillComponent } from './player-list-skill/player-list-skill.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayerListComponent
      },
      {
        path: ':skill',
        component: CardAndPlayerComponent
      }
    ])
  ],
  declarations: [
    PlayerListComponent,
    CardAndPlayerComponent,
    PlayerListSkillComponent,
    PlayerDetailComponent
  ]
})
export class PlayerModule { }
