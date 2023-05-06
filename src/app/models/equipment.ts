import { Item } from './item'
/**
 * an interface for streamlining equipment on the character
 */
export interface Equipment {
    head: Item | null;
    body: Item | null;
    hand: Item | null;
}