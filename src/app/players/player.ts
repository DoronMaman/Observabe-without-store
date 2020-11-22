

export interface Player {
  id: number;
  playerName: string;
  description?: string;
  img?:string;
  price?: number;
  categoryId?: number;
  category?: string;
  searchKey?: string[];
}
