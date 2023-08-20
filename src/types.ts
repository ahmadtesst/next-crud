export interface Item {
  _id: string;
  title: string;
  createdAt: string;
}

export type ItemsResponse = Item[]