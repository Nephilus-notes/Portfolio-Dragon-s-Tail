/**
 * A template for creating new characters. Keys: it, name, strength, dexterity,
 * constitution, intelligence, job, ability, description
 */
export interface Template {
    id:string;
    name: string;
    strength:number;
    dexterity:number;
    intelligence:number;
    constitution:number;
    job:string;
    ability:string;
    description:string;
}