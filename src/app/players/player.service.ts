import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, combineLatest, BehaviorSubject, Subject, merge } from 'rxjs';
import { catchError, tap ,map, scan, shareReplay} from 'rxjs/operators';

import {  Player } from './player';
import { PlayerCategoryService } from '../player-categories/player-category.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = 'api/players';
  // private suppliersUrl = this.supplierService.suppliersUrl;
  playerSelectedSubject=new BehaviorSubject<number>(0);
  playerSelectedAction$=this.playerSelectedSubject.asObservable();


  constructor(private http: HttpClient,private playerWithCategory:PlayerCategoryService) { }

              players$=this.http.get<Player[]>(this.playersUrl).pipe(
                tap(data => console.log('Player: ', JSON.stringify(data))),
                catchError(this.handleError)
              );
  

      // products$= this.http.get<Product[]>(this.playersUrl)
      // .pipe(
      //   tap(data => console.log('Products: ', JSON.stringify(data))),
      //   catchError(this.handleError)
      // );
      playerWithCategory$=combineLatest([this.players$,this.playerWithCategory.playersCategory$]).pipe(
        map(([products,categories])=>products.map(player=>({ 
                  ...player,
          price:player.price*100,
          category:categories.find(c=>player.categoryId===c.id).name
        }as Player)
      )
        ),shareReplay(1)
      );

      selectPlayer$=combineLatest([this.playerWithCategory$,this.playerSelectedAction$])
      .pipe(
        map(([products,selectedProductId])=> products.find(product=>product.id===selectedProductId)),
        tap(product=>console.log("selectProduct",product)),
        shareReplay(1)

      );

   insertPlayerSubject=new Subject<Player>();
   insertPlayerAction$=this.insertPlayerSubject.asObservable();

   playerWithAdd$=merge(this.playerWithCategory$,this.insertPlayerAction$).pipe(
     scan((acc:Player[],value:Player)=>[...acc,value]),
   );
addPlayer(newPlayer?:Player):void{
  newPlayer=newPlayer||this.fakePlayer();
  this.insertPlayerSubject.next(newPlayer);
}

  private fakePlayer(): Player {
    return {
      id: 15,
      playerName: 'doron maman',
      description: 'maccabi haifa',
      price: 1.0000,
      categoryId: 3,
    };
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
  selectedPlayerCahnged(selectedPlayerId:number):void {
    this.playerSelectedSubject.next(selectedPlayerId)
  }

}
