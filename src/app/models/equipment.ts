import { Item } from './item'

export interface Equipment {
    head: Item | null;
    body: Item | null;
    hand: Item | null;
}