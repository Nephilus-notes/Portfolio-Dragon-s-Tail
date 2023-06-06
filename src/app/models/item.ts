/**
 * An interface for storing and using items. Keys: id, name, itemStat, price, 
 * slot, description
 */
export interface Item {
    id:number;
    name: string;
    itemStat: number;
    price: number;
    slot: string;
    description: string;
    type: string;
}