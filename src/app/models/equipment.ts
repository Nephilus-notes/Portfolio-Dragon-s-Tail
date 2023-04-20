import { Item } from './item'

export interface Equipment {
    Head: Item | null;
    Body: Item | null;
    Hand: Item | null;
}