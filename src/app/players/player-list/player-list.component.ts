import { Component } from '@angular/core';

import { Subscription, EMPTY, combineLatest, BehaviorSubject } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { PlayerService } from '../player.service';
import { PlayerCategoryService } from '../../player-categories/player-category.service';

@Component({
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  pageTitle = 'Maccabi Haifa';
  errorMessage = '';
  categories;
private selectCategorySubject=new BehaviorSubject<number>(0);
categorySelectAction=this.selectCategorySubject.asObservable();
  sub: Subscription;
  players$=combineLatest([this.playerService.playerWithAdd$,this.categorySelectAction]).pipe(
    map(([players,selectCategoryId])=> 
    players.filter(player=>
      selectCategoryId?player.categoryId===selectCategoryId:true  )),
         catchError(err=>{
      this.errorMessage=err;
      return EMPTY;
    }
      )
  )


  
  categories$=this.categoryService.playersCategory$.pipe(
    catchError(err=>{
      this.errorMessage=err;
      return EMPTY;
    }
      )
  );



  constructor(private playerService: PlayerService,private categoryService: PlayerCategoryService) { }



 

  onAdd(): void {
    this.playerService.addPlayer();
  }

  onSelected(categoryId: string): void {
    this.selectCategorySubject.next(+categoryId);
  }
}
