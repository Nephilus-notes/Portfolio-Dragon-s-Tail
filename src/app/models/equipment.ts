import { Item } from './item'
/**
 * an interface for streamlining equipment on the character. Contains head, body, and hand items
 */
export interface Equipment {
    head: Item | null;
    body: Item | null;
    hand: Item | null;
}