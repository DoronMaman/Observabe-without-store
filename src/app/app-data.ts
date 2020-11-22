import { InMemoryDbService } from 'angular-in-memory-web-api';

import { PlayerData } from './players/player-data';
import { PlayerCategoryData } from './player-categories/player-category-data';
import { SupplierData } from './suppliers/supplier-data';
import { Player } from './players/player';
import { PlayerCategory } from './player-categories/player-category';

export class AppData implements InMemoryDbService {

  createDb(): { players: Player[], productCategories: PlayerCategory[]} {
    const players = PlayerData.players;
    const productCategories = PlayerCategoryData.categories;
    return { players, productCategories };
  }
}
